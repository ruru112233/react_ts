import "../styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-datepicker/dist/react-datepicker.css"

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import axios from "axios";

import API, { graphqlOperation } from '@aws-amplify/api';
import {createEvents, updateEvents, deleteEvents } from '.././graphql/mutations';
import {listEvents, listRoles, listRoleGroups, listUserSettings} from '.././graphql/queries';

import { Oval } from  'react-loader-spinner'

import PersistentDrawerRight from "../components/PersistentDrawerRight";

const send_line_server = "https://yalgcfhxjk.execute-api.ap-northeast-1.amazonaws.com/default/send-line";

async function createNewEvent(props: { title: any; start: any; end: any; targets: any; remarks: any; sendFlag: any; }) {
  try{
    const {title, start, end, targets, remarks, sendFlag} = props;
    const startTime = new Date(start);
    const endTime = new Date(end);
    const event = 
        { 
          title: title,
          startTime: startTime,
          endTime: endTime, 
          targets: targets,
          remarks: remarks,
          sendFlag: sendFlag
        };
    let res = await API.graphql(graphqlOperation(createEvents, { input: event }));
    return res;
  
  }catch(err){
    console.log(`err=${JSON.stringify(err)}`);
  }
  
} 

async function updateNewEvent(props: { id: any; title: any; start: any; end: any; targets: any; remarks: any; sendFlag: any; }) {
  try{
    const {id, title, start, end, targets, remarks, sendFlag} = props;
    console.log("updateId=", JSON.stringify(props));
    const startTime = new Date(start);
    const endTime = new Date(end);
    const event = 
        { 
          id: id,
          title: title,
          startTime: startTime,
          endTime: endTime, 
          targets: targets,
          remarks: remarks,
          sendFlag: sendFlag
        };
    let res = await API.graphql(graphqlOperation(updateEvents, { input: event }));
    return res;
  
  }catch(err){
    console.log(`err=${JSON.stringify(err)}`);
  }
  
} 

async function deleteEvent(props: any) {

  const id = props;
  const event = 
      { 
        id: id 
      };
  await API.graphql(graphqlOperation(deleteEvents, { input: event }));
  
} 

async function getlistEvent() {
  try{
    const List = await API.graphql(graphqlOperation(listEvents));
    return List;
  }catch(err){
    console.log(`err=${JSON.stringify(err)}`);
  }
  
}

async function getlistRole() {
  try{
    const List = await API.graphql(graphqlOperation(listRoles));
    return List;
  }catch(err){
    console.log(`err=${JSON.stringify(err)}`);
  }
  
}

async function getlistRoleGroup() {
  try{
    const List = await API.graphql(graphqlOperation(listRoleGroups));
    return List;
  }catch(err){
    console.log(`err=${JSON.stringify(err)}`);
  }
}

async function getlistUserSetting() {
  try{
    const List = await API.graphql(graphqlOperation(listUserSettings));
    return List;
  }catch(err){
    console.log(`err=${JSON.stringify(err)}`);
  }
}

const useStyles = makeStyles(() =>
  createStyles({
    cover: {
      opacity: 0,
      visibility: "hidden",
      position: "fixed",
      width: "100%",
      height: "100%",
      zIndex: 1000,
      top: 0,
      left: 0,
      background: "rgba(0, 0, 0, 0.3)"
    },
    form: {
      opacity: 0,
      visibility: "hidden",
      position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      fontWeight: "bold",
      background: "rgba(255, 255, 255)",
      width: "400px",
      height: "300px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000
    },
    inView: {
      // cover, formを表示する時に適用するStyle。
      opacity: 1,
      visibility: "visible"
    },
    systemLoadFlag: {
      // cover, formを表示する時に適用するStyle。
      opacity: 1,
      visibility: "visible",
      background: "rgba(255, 255, 255,0)",
    },
    form2: {
      opacity: 0,
      visibility: "hidden",
      position: "fixed",
      marginLeft: "auto",
      marginRight: "auto",
      fontWeight: "bold",
      background: "rgba(255, 255, 255)",
      width: "400px",
      height: "300px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000
    },

  })
);

registerLocale("ja", ja);

interface myEventsType {
  id: string;
  title: string;
  start: Date;
  end: Date;
  targets: string[];
  remarks: string;
  sendFlag: number;
}

interface myRoleType {
  id: string;
  roleName: string;
  roleGroupId: string[];
}

let eventsItem: any = [];

const SampleCalendar: React.FC = (props: any) => {
  const classes = useStyles();
  let ref = React.createRef<any>();

  const [targetInit, setTargetInit] = useState<string>("");
  // DBのuseState
  const [eventList, setEventList] = useState([]);
  const [userSettingList, setUserSetting] = useState<any>([]);
  
  const [inputId, setInputId] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputStart, setInputStart] = useState(new Date());
  const [inputEnd, setInputEnd] = useState(new Date());
  const [targetList, setTargetList] = useState<string[]>([]);
  const [inputRemarks, setInputRemarks] = useState<string>("");
  const [inView, setInView] = useState(false);
  const [myEvents, setMyEvents] = useState<myEventsType[]>([]);
  const [sendFlag, setSendFlag] = useState(true);
  
  const [loadFlag, setLoadFlag] = useState<boolean>(true);
  const [roleLoadFlag, setRoleLoadFlag] = useState<boolean>(true);
  
  const [deleteButtonView, setDeleteButtonView] = useState(false);

  const [roleList, setRoleList] = useState<any>([]);
  const [roleGroupList, setRoleGroupList] = useState<any>([]);
  const [roleAllList, setRoleAllList] = useState<any>([]);

  // 書き込み読み込み管理
  const [systemLoadFlag, setSystemLoadFlag] = useState<boolean>(false);

  // dynamoDBからデータを取得
  const setEvents = async () =>{
    const list: any = await getlistEvent();
    setEventList(list);
  };
  const setUserSettings = async () =>{
    const list: any = await getlistUserSetting();
    setUserSetting(list);
  };
  const setRoles = async () =>{
    const list: any = await getlistRole();
    // if(!list ||
    //    !list?.data ||
    //    !list?.data?.listRoles ||
    //    !list?.data?.listRoles?.items){
    //   return;
    // }

    // if(list?.data?.listRoles?.items?.length == 0){
    //   return;
    // }

    setRoleList(list?.data?.listRoles?.items);
  };
  const setRoleGroups = async () =>{
    const list: any = await getlistRoleGroup();

    // if(!list ||
    //    !list?.data ||
    //    !list?.data?.listRoleGroups ||
    //    !list?.data?.listRoleGroups?.items){
    //   return;
    // }

    // if(list?.data?.listRoleGroups?.items?.length == 0){
    //   return;
    // }
    
    setRoleGroupList(list?.data?.listRoleGroups?.items);
  };

  useEffect(() => {
    setEvents();
    setUserSettings();
    setRoles();
    setRoleGroups();
    eventsItem = [];
  },[])

  // ロールIDが一致しているかチェック
  const roleIdCheck = (id1: string, id2: string) => {
    if(id1 == id2){
      return true;
    }
    return false;
  }

  // ロールグループに設定されているロールIDが一致しているかチェック
  const roleGroupIdCheck = (targetRoleId: string, roleGroupId: string[]) => {
    for(let roleid of roleGroupId)
    {
      if(targetRoleId == roleid)
      {
        return true;
      }
    }
    return false;
  }
  
  useEffect(() => {
    console.log("setDbEvents start");
    
    if(!loadFlag){
      return;
    }

    const setDbEvents = async (props: string | any[], userName2: string) => {
      if(!props){
        return;
      }
      for(let oneProps of props){
        const {id, title, startTime, endTime, targets,remarks, sendFlag} = oneProps;
    
        const start = new Date(startTime);
        const end = new Date(endTime);

        let target = [];

        if(targets){
          target = targets;
        }
   
        const event: myEventsType = {
          id: id,
          title: title,
          start: start,
          end: end,
          targets: target,
          remarks: remarks,
          sendFlag: sendFlag
        };  
        setTargetList(target);

        if(userSettingList?.data?.listUserSettings?.items?.length == 0)
        {
          return;
        }

        if(roleGroupList?.length == 0)
        {
          return;
        }
        // UserSettingに設定している役職と一致しないものは登録しない
        for(let oneUserSetting of userSettingList?.data?.listUserSettings?.items)
        {
          if (oneUserSetting.userName == userName2)
          {
            for(let roleIdList of oneUserSetting.userRoleID)
            {
              // roleIdとイベントのroleIdが一致しているか確認
              let roleRes = roleIdCheck(event.targets[0], roleIdList);
              
              // ロールグループとイベントのroleIdが一致しているか確認
              const roleGroup = roleGroupList.find((el: any) => el?.id == event.targets[0]);
              let roleGroupRes = false;
              if(roleGroup){
                roleGroupRes = roleGroupIdCheck(roleIdList, roleGroup.roleGroupId);
              }
              
              if(!roleRes && !roleGroupRes){
                continue;
              }
              
              let eventCheck = eventsItem.find((e: myEventsType) => e.id == event.id);

              // 既に登録済のイベントは、登録しない。
              if(eventCheck){
                continue;
              }

              eventsItem.push(event);
              ref.current.getApi().addEvent(event);
            }
          }
        }


      }

      const setItem = (eventsItem: any) => {
        setMyEvents([...myEvents, ...eventsItem]);
      }
    
      setItem(eventsItem);
    
      setLoadFlag(false);
    
    };
    
    const eventData = (eventList: any) => {
      if (eventList?.data?.listEvents?.items) {
          setDbEvents(eventList.data.listEvents.items, props.username);
      }    
    }
    
    eventData(eventList);
    
  }, [eventList, userSettingList, roleGroupList, loadFlag]);

  useEffect(() => {
    // dynamoDBからデータを取得
    const setRoles = async (roleList:any) =>{
      
      if(!roleLoadFlag){
        return;
      }
      if(roleList?.length == 0){
        return;
      }
      if(roleGroupList?.length == 0){
        return;
      }
      let setRoleGroup: any = [];

      for (let oneRoleGroup of roleGroupList){
        let role: myRoleType = {
          id: oneRoleGroup["id"],
          roleName: oneRoleGroup["groupName"],
          roleGroupId: oneRoleGroup["roleGroupId"]
        }

        setRoleGroup.push(role);
      }

      let setRole: any = [];

      for (let oneRole of roleList){
        setRole.push(oneRole);
      }

      let roleAll = setRoleGroup.concat(setRole);
      setRoleAllList(roleAll);
      setTargetInit(roleAll[0]["id"]);
      
      setRoleLoadFlag(false);
    };
    setRoles(roleList);
  }, [roleList, roleGroupList, roleAllList]);

  const handleCLick = (info: any) => {
    /**
     * infoにはカレンダーに登録されたイベントが入ってくる。そのイベントのIDを元にmyEvents
     * に格納されたイベントを取り出してStateに保存する。
     */
    
    const event: any = myEvents.find((el) => el.id == info.event.id);
    
    if(!event){
      return;
    }
    
    setDeleteButtonView(true);
    
    const id = event.id;
    const title = event.title;
    const start = event.start;
    const end = event.end;
    
    let tartget = event.targets;
    
    // 備考の設定
    let remarks = event.remarks;
    if(remarks){
      remarks = "";
    }
    
    setInputId(id);
    setInputTitle(title);
    setInputStart(start);
    setInputEnd(end);
    setTargetList(tartget);
    setInView(true);
  };

  const handleSelect = (selectinfo: any) => {
    const start = new Date(selectinfo.start);
    const end = new Date(selectinfo.end);
    start.setHours(start.getHours());
    end.setHours(end.getHours());

    console.log("targetInit===", targetInit);
    
    setInputId("");
    setInputTitle("");
    setInputStart(start);
    setInputEnd(end);
    setTargetList([targetInit])
    setInputRemarks("");
    setInView(true);
    setDeleteButtonView(false);
  };
  
  
  // カレンダーに予定を追加する
  const onAddEvent = async () => {
    const startTime = inputStart;
    const endTime = inputEnd;

    if (startTime >= endTime) {
      alert("開始時間と終了時間を確認してください。");
      return;
    }
    
    // DB用のsendFlag設定
    // true => 1, false => 0
    let setSendFlagNum = 0;
    
    if (sendFlag){
      setSendFlagNum = 1;
    }
    
    const event: myEventsType = {
      id: "",
      title: inputTitle,
      start: startTime,
      end: endTime,
      targets: targetList,
      remarks: inputRemarks,
      sendFlag: setSendFlagNum
    };
    
    // Stateにイベントを追加する。ここで登録されたイベントは、予定を変更するときなどに使用する。
    let res = await createNewEvent(event);

    await setEvents();
    
    // lambdaに通知
    await lambdaCall("create");

    setSystemLoadFlag(false);
  };

  // カレンダーに予定を追加する
  const onChengeEvent = async () => {
    const startTime = inputStart;
    const endTime = inputEnd;

    if (startTime >= endTime) {
      alert("開始時間と終了時間を確認してください。");
      return;
    }
    
    // DB用のsendFlag設定
    // true => 1, false => 0
    let setSendFlagNum = 0;
    
    if (sendFlag){
      setSendFlagNum = 1;
    }
    
    const event: myEventsType = {
      id: inputId,
      title: inputTitle,
      start: startTime,
      end: endTime,
      targets: targetList,
      remarks: inputRemarks,
      sendFlag: setSendFlagNum
    };
    
    // Stateにイベントを追加する。ここで登録されたイベントは、予定を変更するときなどに使用する。
    let res = await updateNewEvent(event);

    await setEvents();
    
    // lambdaに通知
    await lambdaCall("update");

    setSystemLoadFlag(false);
  };
  
  // カレンダーの予定を削除する
  const onDeleteEvent = async () => {
    
    setDeleteButtonView(false);
    
    const eventId = inputId;
    const deleteEvent1 = ref.current.getApi().getEventById(eventId);
    await deleteEvent(eventId);
    deleteEvent1.remove();

    console.log("削除完了");

    setSystemLoadFlag(false);

  };
  
  // lambdaをたたく
  const lambdaCall = async (createFlag:string) => {
    console.log("lambdaCall");
    
    const sendFlag_str = String(sendFlag);
    
    const params = {
      sendFlag: sendFlag_str,
      createFlag: createFlag
    };
    
    await axios.post(send_line_server, params)
    .then((res) => {
      setLoadFlag(true);
      console.log(`res=${(JSON.stringify(res))}`);
    })
    .catch((error) => {
      console.log("axiosエラー")
    })
    ;
  };

  const coverElement = (
    <div
      onClick={() => setInView(false)}
      className={inView ? `${classes.cover} ${classes.inView}` : classes.cover}
    />
  );
  const coverElement2 = (
    <div
      className={systemLoadFlag ? `${classes.cover} ${classes.inView}` : classes.cover}
    />
  );

  const titleElement = (
    <div>
      <label>タイトル</label>
      <input
        type="text"
        value={inputTitle}
        name="inputTitle"
        onChange={(e) => {
          // タイトルが入力されたら、その値をStateに登録する。
          setInputTitle(e.target.value);
        }}
      />
    </div>
  );

  const startTimeElement = (
    <div>
      <label>開始</label>
      <DatePicker
        locale="ja"
        dateFormat="yyyy/MM/d HH:mm"
        selected={inputStart}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={10}
        todayButton="today"
        name="inputStart"
        onChange={(time: Date) => {
          setInputStart(time);
        }}
      />
    </div>
  );

  const endTimeElement = (
    <div>
      <label>終了</label>
      <DatePicker
        locale="ja"
        dateFormat="yyyy/MM/d HH:mm"
        selected={inputEnd}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={10}
        todayButton="today"
        name="inputEnd"
        onChange={(time: Date) => {
          setInputEnd(time);
        }}
      />
    </div>
  );

  const handleChange = (e: any) => {
    let targets: any = [];
    targets.push(e.target.value);

    setTargetList(targets);

  }

  const roleSelectElement = (
    <div>
      <label>参加対象</label>
      <select value={targetList[0]} onChange={handleChange}>
        {roleAllList.map((role: any, index: any) => (
          <option key={index} value={role['id']}>{role['roleName']}</option>
        ))}
      </select>
    </div>
  );

  const remarksElement = (
    <div>
      <label>備考</label>
      <input
        type="text"
        value={inputRemarks}
        name="inputRemarks"
        onChange={(e) => {
          setInputRemarks(e.target.value);
        }}
      />
    </div>
  );
  
  const sendFlagElement = (
    <div>
      <label>連絡する？</label>
      <input
        type="checkbox"
        defaultChecked={sendFlag}
        onClick={()=> {
          setSendFlag(!sendFlag);
        }}
      />
    </div>
  );

  const btnElement = (
    <div>
      <input
        type="button"
        value="キャンセル"
        onClick={() => {
          setInView(false);
        }}
      />
      {!deleteButtonView ? (
      <input 
        type="button" 
        value="保存" 
        onClick={() => { 
          onAddEvent();
          setInView(false);
          setSystemLoadFlag(true);
        }} 
      />
      ) : null}
      {deleteButtonView ? (
        <input
          type="button"
          value="更新"
          onClick={async () => {
            onChengeEvent();
            setInView(false);
            setSystemLoadFlag(true);
          }}
        />
      ) : null}
      {deleteButtonView ? (
        <input
          type="button"
          value="削除"
          onClick={async () => {
            onDeleteEvent();
            setInView(false);
            setSystemLoadFlag(true);
          }}
        />
      ) : null}
    </div>
  );
  
  const loaderElement = (
    <div
      className={systemLoadFlag ? `${classes.form} ${classes.systemLoadFlag}` : classes.form}
    >
      <form>
        <Oval color="#00BFFF" height={80} width={80} />
      </form>
    </div>
    
  )

  const formElement = (
    <div
      className={inView ? `${classes.form} ${classes.inView}` : classes.form}
    >
      <form>
        <div>予定を入力</div>
        {titleElement}
        {startTimeElement}
        {endTimeElement}
        {roleSelectElement}
        {remarksElement}
        {sendFlagElement}
        {btnElement}
      </form>
    </div>
  );


  return (
    <>
      <PersistentDrawerRight />
      <div>
        {coverElement}
        {coverElement2}
        {loaderElement}
        {formElement}
        <FullCalendar
          locale="ja" // ロケール設定。
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]} // 週表示、月表示、日付等のクリックを可能にするプラグインを設定。
          initialView="timeGridWeek" // カレンダーの初期表示設定。この場合、週表示。
          slotDuration="00:30:00" // 週表示した時の時間軸の単位。
          selectable={true} // 日付選択を可能にする。interactionPluginが有効になっている場合のみ。
          businessHours={{
            // ビジネス時間の設定。
            daysOfWeek: [1, 2, 3, 4, 5], // 0:日曜 〜 7:土曜
            startTime: "00:00",
            endTIme: "24:00"
          }}
          weekends={true} // 週末を強調表示する。
          titleFormat={{
            // タイトルのフォーマット。(詳細は後述。※1)
            year: "numeric",
            month: "short"
          }}
          headerToolbar={{
            // カレンダーのヘッダー設定。(詳細は後述。※2)
            start: "title",
            center: "prev, next, today",
            end: "dayGridMonth,timeGridWeek"
          }}
          ref={ref}
          eventClick={handleCLick}
          select={handleSelect}
        />
      </div>
    </>
  );
};

export default SampleCalendar;
