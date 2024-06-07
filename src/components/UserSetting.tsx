import "../styles.css";
import React, { useState, useEffect } from "react";
import { Button, ChakraProvider, Checkbox  } from "@chakra-ui/react";
import PersistentDrawerRight from "../components/PersistentDrawerRight";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {createUserSetting, updateUserSetting} from '.././graphql/mutations';
import {listRoles, listUserSettings} from '.././graphql/queries';
import API, { graphqlOperation } from '@aws-amplify/api';
import { WarningTwoTone } from "@material-ui/icons";

async function createNewUserSetting(props: {userName: string, userRoleId: string[]}) {
  const {userName, userRoleId} = props;
  const userSetting = 
      { 
        userName: userName,
        userRoleID: userRoleId
      };
  const res = await API.graphql(graphqlOperation(createUserSetting, { input: userSetting }));
  return res;
} 

async function updateChengeUserSetting(props: {id: any, userName: string, userRoleId: string[]}) {
  const {id, userName, userRoleId} = props;
  const userSetting = 
      { 
        id: id,
        userName: userName,
        userRoleID: userRoleId
      };
  const res = await API.graphql(graphqlOperation(updateUserSetting, { input: userSetting }));

  return res;
}

async function getlistRole() {
  try{
    const List = await API.graphql(graphqlOperation(listRoles));
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

type checkBoxType = {
  id: string,
  value: string,
  checked: boolean,
  onChange: any;

}

type userSettingType = {
  id: string,
  userName: string,
  userRoleId: string[]
}

// checkboxコンポーネント
const CheckBox = (props: checkBoxType) => {
  const {id, value, checked, onChange} = props;
  return (
    <input
      id={id}
      type="checkbox"
      name="inputNames"
      checked={checked}
      onChange={onChange}
      value={value}
    />
  )
}

const setId:any = [];

export const UserSetting = (props: any) => {

  const [loadFlag, setLoadFlag] = useState<boolean>(true);
  const [settingLoadFlag, setSettingLoadFlag] = useState<boolean>(true);
  const [roleList, setRoleList] = useState([]);
  const [roleIdList, setRoleIdList] = useState<string[]>([]);
  const [userSetting, setUserSetting] = useState<userSettingType[]>([]);
  // //checkedItemsは初期値を空のオブジェクトにする
  // const [checkedItems, setCheckedItems] = useState<any>([]);
  const [checked, setChecked] = useState<string[]>([]);

  const [buttonFlag, setButtonFlag] = useState<boolean>(true);
  
  useEffect(() => {
    // dynamoDBからデータを取得
    // RoleList
    const setRoles = async (roleList:any) =>{
      
      if(!loadFlag){
        return;
      }

      // Rollsテーブルから役職データを取得
      const list: any = await getlistRole();

      if(list.length == 0){
        return;
      }

      let setRole: any = [];

      for (let oneRole of list?.data?.listRoles?.items){
        setRole.push(oneRole);
      }
      setRoleList(setRole);
      setLoadFlag(false);
    };
    setRoles(roleList);
  },[roleList, loadFlag])
  
  const wait = async (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    // userSettingのロード
    
    let setSetting: any = [];
    const setUserSettingList = async () => {
      console.log('setUserSettingList');
      
      if(!settingLoadFlag){
        return;
      }

      // userSettingテーブルからデータを取得
      const list: any = await getlistUserSetting();

      if(list?.data?.listUserSettings?.items == 0){
        return;
      }

      let rolesId: string[] = [];
      let userSetting2: userSettingType[] = [];

      for(let oneUserSetting of list?.data?.listUserSettings?.items){

        for(let roleId of oneUserSetting['userRoleID'])
        {
          rolesId.push(roleId);
        }

        const setUser: userSettingType = 
        {
          id: oneUserSetting['id'],
          userName: oneUserSetting['userName'],
          userRoleId: rolesId
        }

        userSetting2.push(setUser);
        
      }
      setChecked(rolesId);
      setUserSetting(userSetting2);
      setSettingLoadFlag(false);
    };
    
    setUserSettingList();
  }, [settingLoadFlag, checked])
  
    const setUserRole = async() => {
      console.log("setUserRole");
      
      const use = userSetting.find((el) => el['userName'] == props.username);

      if(use)
      { 
        const userRole = {
          id: use?.id,
          userName: props.username,
          userRoleId: checked
        }

        const res = await updateChengeUserSetting(userRole);
        console.log(res);
      }
      else
      {
        const userRole = {
          userName: props.username,
          userRoleId: checked
        }

        const res = await createNewUserSetting(userRole);
        console.log(res);
      }
    }
  
  const handleChange = (e: any) => {

    setChecks(e.target.id);

  }

  const setChecks = (id: any) => {
    let result = checked.find((el : any) => el == id);

    let arr = [];

    if(result)
    {
      setChecked(checked.filter((el) => el != id));
    }
    else
    {
      for(let oneCheck of checked)
      {
        arr.push(oneCheck)
      }

      arr.push(id);

      setChecked(arr);
    }
  }

  const check = (e: any) => {
    let result = false;
    for(let oneCheck of checked)
    {
        if(oneCheck == e)
        {
          result = true;
          break;
        }
    }
    
    return result;
    
  }

  const btnElement = (
    <div>
      <button
        disabled={buttonFlag}
        onClick={() => {
          console.log("更新ボタン");
          // 更新
          setUserRole();
          setButtonFlag(true);
        }}
        >
          更新
        </button>
    </div>
  )

  return (
    <>
      <PersistentDrawerRight />
      <p>UserSetting</p>
      <hr className="line" />
      <p>ユーザ名： {props.username}</p>
      <hr className="line" />
      <Table>
        <TableHead>
          <TableCell>役職名</TableCell>
        </TableHead>
        <TableBody>
         {roleList.map((row: any, index: any) => (
            <TableRow
              key={row.roleName}
              onClick={() => {
                setChecks(row.id);
                setButtonFlag(false);
              }}
            >
              <TableCell component="th" scope="row">
                <CheckBox
                  id={row.id}
                  value={row}
                  onChange={handleChange}
                  checked={check(row.id)}
                />
                {row.roleName}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
        {btnElement}
      </Table>
    </>
  );
};