import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import API, { graphqlOperation } from '@aws-amplify/api';

import {createRoleGroup, updateRoleGroup, deleteRoleGroup } from '.././graphql/mutations';
import {listRoleGroups, listRoles } from '.././graphql/queries';

import { Oval } from  'react-loader-spinner'

import PersistentDrawerRight from "../components/PersistentDrawerRight";

async function createNewRoleGroup(props: {groupName: string, roleGroupId: string[]}) {
  const {groupName, roleGroupId} = props;
  console.log(`props=${JSON.stringify(props)}`);
  const roleGroup = 
      { 
        groupName: groupName,
        roleGroupId: roleGroupId
      };
  const res = await API.graphql(graphqlOperation(createRoleGroup, { input: roleGroup }));

  return res;
} 

async function updateChengeRoleGroup(props: {id: string, groupName: string, roleGroupId: string[]}) {
  const {id, groupName, roleGroupId} = props;
  console.log(`chenge_props=${JSON.stringify(props)}`);
  const role = 
      { 
        id: id,
        groupName: groupName,
        roleGroupId: roleGroupId
      };

  console.log(`chenge_props_role=${JSON.stringify(role)}`);

  const res = await API.graphql(graphqlOperation(updateRoleGroup, { input: role }));

  return res;

}

async function deleteNewRoleGroup(props: {id: string}) {
  const {id} = props;
  console.log(`delete_props=${JSON.stringify(props)}`);
  const role = 
      { 
        id: id
      };
  const res = await API.graphql(graphqlOperation(deleteRoleGroup, { input: role }));

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

async function getlistRoleGroup() {
  try{
    const List = await API.graphql(graphqlOperation(listRoleGroups));
    return List;
  }catch(err){
    console.log(`err=${JSON.stringify(err)}`);
  }
  
}

type roleGroupDataType = {
  id: string,
  groupName: string,
  roleGroupId: string[];
};

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const RoleGroupSetting: React.FC = () => {
  console.log("レンダリング");
  const classes = useStyles();

  const [inputId, setInputId] = useState<string>("");
  const [inputGroupName, setInputGroupName] = useState<string>("");
  const [inputRoleGroupId, setInputRoleGroupId] = useState<string[]>([]);
  const [inputRoleId, setInputRoleId] = useState<string>("");
  const [loadFlag, setLoadFlag] = useState<boolean>(true);
  const [roleList, setRoleList] = useState([]);
  const [roleGroupList, setRoleGroupList] = useState([]);
  const [roleGroupList2, setRoleGroupList2] = useState<string[]>([""]);
  const [inputSetRoleId, setInputSetRoleId] = useState<string>("");
  const [createFlag, setCreateFlag] = useState<boolean>(true);

  const [roleNameList, setRoleNameList] = useState<string[]>([""]);

  // 書き込み読み込み管理
  const [systemLoadFlag, setSystemLoadFlag] = useState<boolean>(false);

  const setRoleGroupData = (props: roleGroupDataType) => {
    const { id, groupName, roleGroupId} = props;
    console.log("props=", JSON.stringify(groupName));
    setInputId(id);
    setInputGroupName(groupName);
    setInputRoleGroupId(roleGroupId);

  };

  useEffect(() => {

    const setRole = async (roleList:any) =>{
      
      // if(!loadFlag){
      //   return;
      // }

      const list: any = await getlistRole();
      
      if(list.data.listRoles.items.length == 0){
        return;
      }

      let setRole: any = [];

      for (let oneRole of list?.data?.listRoles?.items){
        setRole.push(oneRole);
      }

      setRoleList(setRole);

      setInputRoleId(setRole[0]['id']);
      
      // setLoadFlag(false);
    };
    setRole(roleList);

  }, [])
  
  useEffect(() => {
    // dynamoDBからデータを取得
    const setRoleGroups = async (roleGroupList:any) =>{
      
      if(!loadFlag){
        return;
      }

      const list: any = await getlistRoleGroup();

      if(!list){
        return;
      }

      if(list.data.listRoleGroups.items.length == 0){
        return;
      }
      let setRoleGroup: any = [];
      

      for (let oneRoleGroup of list?.data?.listRoleGroups?.items){
        setRoleGroup.push(oneRoleGroup);
        
      }

      setRoleGroupList(setRoleGroup);
      
      setLoadFlag(false);
    };
    setRoleGroups(roleGroupList);

    let roleNames: any = [];
    
    for(let oneRoleGroup of roleGroupList){
      let nameList: any = '';
      for(let roleId of oneRoleGroup['roleGroupId']){
        let roleName: any = roleList.find((el: any) => el.id == roleId);

        if(!roleName){
          return;
        }
        
        if(nameList == ''){
          nameList = roleName['roleName'];
        }else{
          nameList = nameList + ',' + roleName['roleName'];
        }
        
      }
      roleNames.push(nameList);
    }
    setRoleNameList([...roleNames]); 
    console.log(`roleNameList=${JSON.stringify(roleNameList)}`);
  }, [roleList, loadFlag, inputId])

  // 役職、グループを追加する
  const onAddRoleGropu = async() => {

    if (!inputGroupName) {
      alert("グループ名を入力してください");
      return;
    }

    if (!roleGroupList2) {
      alert("役職を追加してください");
      return;
    }


    const list: string[] = [];

    roleGroupList2.forEach((key: any) => {
      list.push(key['id']);
    });
    
    const roleGroup = {
      groupName: inputGroupName,
      roleGroupId: list
    }
    
    const res = await createNewRoleGroup(roleGroup);

    // DBの再読み込み
    setLoadFlag(true);

    setSystemLoadFlag(false);

  };

  // 役職、グループを変更する
  const chengeRoleGroup = async() => {

    if (!inputId) {
      alert("IDがありません。");
      return;
    }

    const list: string[] = [];

    roleGroupList2.forEach((key: any) => {
      list.push(key['id']);
    });
    
    const updateRoleGroup = {
      id: inputId,
      groupName: inputGroupName,
      roleGroupId: list
    }
    
    const res = await updateChengeRoleGroup(updateRoleGroup);

    // DBの再読み込み
    setLoadFlag(true);

    setSystemLoadFlag(false);
    
  };

  // 役職、グループを変更する
  const onDeleteRoleGropu = async() => {

    if (!inputId) {
      alert("IDがありません。");
      return;
    }
    
    const res = await deleteNewRoleGroup({id: inputId});

    // DBの再読み込み
    setLoadFlag(true);

    setSystemLoadFlag(false);
    
  };

  const groupNameElement = (
    <div>
      <label>　　　　　グループ名</label>
      <input
        type="text"
        value={inputGroupName}
        name="inputName"
        onChange={(e) => {
          setInputGroupName(e.target.value);
        }}
      />
    </div>
  );

  const handleChange = (e: any) => {
    
    setInputRoleId(e.target.value);

  }

  const handleChange2 = (e: any) => {
    
    setInputSetRoleId(e.target.value);

  }

  

  const setRoleGroupElement = (
    <div>
      <label>登録役職一覧</label>
      <select value={inputSetRoleId} onChange={handleChange2}>
        {roleGroupList2.map((role: any, index: any) => (
          <option key={index} value={role['id']}>{role['roleName']}</option>
        ))}
      </select>
      <input
        type="button"
        value="外す"
        onClick={() => {
          console.log("外す");

          console.log("inputSetRoleId==", inputSetRoleId);
          
          let targetRole = roleGroupList2.filter((el: any) => el['id'] != inputSetRoleId);

          setRoleGroupList2([...targetRole]);

          let count: number = 0;

          targetRole.forEach((role: any) => {

            if(count == 0){
              setInputSetRoleId(role["id"]);
            }
            count++
          });

        }}
      />
    </div>
  );

  const addRoleGroupElement = (
    <div>
      <label>追加する役職</label>
      <select value={inputRoleId} onChange={handleChange}>
        {roleList.map((role: any, index: any) => (
          <option key={index} value={role['id']}>{role['roleName']}</option>
        ))}
      </select>
      <input
        type="button"
        value="追加"
        onClick={() => {
          console.log("追加");

          let groupList: string[] = []

          for (let group of roleGroupList2){
            if(group != ""){
              groupList.push(group);
            }
          }

          let dataCheck = roleGroupList2.find((el: any) => el['id'] == inputRoleId)
          
          if (dataCheck){
            alert("指定の役職は既に登録されています。");
            return;
          }

          let inputData: any = roleList.find((el) => el['id'] == inputRoleId);

          setRoleGroupList2([...groupList, inputData]);

          setInputSetRoleId(inputData['id']);

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
          // setInView(false);
          setRoleGroupData({id: '', groupName: '', roleGroupId: []});
          setRoleGroupList2([]);
          setCreateFlag(true);
        }}
      />
      {createFlag ? (
        <input
          type="button"
          value="保存"
          onClick={() => {
            onAddRoleGropu();
            setRoleGroupData({id: '', groupName: '', roleGroupId: []});
            setRoleGroupList2([]);
            setSystemLoadFlag(true);
            // setInView(false);
          }}
        />
      ):(
        <input
          type="button"
          value="変更"
          onClick={() => {
            chengeRoleGroup();
            setRoleGroupData({id: '', groupName: '', roleGroupId: []});
            setRoleGroupList2([]);
            setCreateFlag(true);
            setSystemLoadFlag(true);
          }}
        />
      )}
      {createFlag ? null:(
        <input
          type="button"
          value="削除"
          onClick={() => {
            onDeleteRoleGropu();
            setRoleGroupData({id: '', groupName: '', roleGroupId: []});
            setRoleGroupList2([]);
            setCreateFlag(true);
            setSystemLoadFlag(true);
            // setInView(false);
          }}
        />
      )}
      
    </div>
  );

  const loaderElement = (
    <div>
      <form>
        <Oval color="#00BFFF" height={80} width={80} />
      </form>
    </div>
    
  )

  const formElement = (
    <div>
      <form>
        <div>グループ一覧</div>
        {groupNameElement}
        {setRoleGroupElement}
        {addRoleGroupElement}
        {btnElement}
      </form>
    </div>
  );

  return (
    <>
      <PersistentDrawerRight />
      {formElement}
      {systemLoadFlag ? (loaderElement) : (
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>グループ名</TableCell>
            <TableCell>役職名</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roleGroupList.map((row: any, index: any) => (
            <TableRow
              key={row.roleName}
              onClick={async () => {
                let inputID = roleGroupList[index]['id'];
                
                // グループ名
                let inputGroupName: string = '';
                if(roleGroupList[index]['groupName']){
                  inputGroupName = roleGroupList[index]['groupName'];
                }
                
                let inputRoleGroupId: string[] = [];
                if(roleGroupList[index]['roleGroupId']){
                  inputRoleGroupId = roleGroupList[index]['roleGroupId'];
                }

                let groupList: string[] = [];

                let nameList = await roleNameList[index].split(',');

                let lopeCount = 0;

                for(let oneName of nameList){

                  roleList.forEach((role) => {
                    if(role['roleName'] == oneName){
                      if(lopeCount == 0){
                        setInputSetRoleId(role["id"]);
                      }
                      groupList.push(role);
                      lopeCount++;
                    }
                  })
                }

                setRoleGroupList2([...groupList]);
                
                setRoleGroupData({id: inputID, groupName: inputGroupName, roleGroupId: inputRoleGroupId});
                setCreateFlag(false);
              }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.groupName}
              </TableCell>
              <TableCell component="th" scope="row">
                {roleNameList[index]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      )}
    </>
  );
};

export default RoleGroupSetting;
