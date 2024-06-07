import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import API, { graphqlOperation } from '@aws-amplify/api';

import {createRole, updateRole, deleteRole } from '.././graphql/mutations';
import {listRoles } from '.././graphql/queries';

import { Oval } from  'react-loader-spinner'

import PersistentDrawerRight from "../components/PersistentDrawerRight";

async function createNewRole(props: {roleName: string, lineApiKey: string}) {
  const {roleName, lineApiKey} = props;
  console.log(`props=${JSON.stringify(props)}`);
  const role = 
      { 
        roleName: roleName,
        lineApiKey: lineApiKey
      };
  const res = await API.graphql(graphqlOperation(createRole, { input: role }));

  return res;
} 

async function updateChengeRole(props: {id: string, roleName: string, lineApiKey: string}) {
  const {id, roleName, lineApiKey} = props;
  console.log(`chenge_props=${JSON.stringify(props)}`);
  const role = 
      { 
        id: id,
        roleName: roleName,
        lineApiKey: lineApiKey
      };
  const res = await API.graphql(graphqlOperation(updateRole, { input: role }));

  return res;

}

async function deleteNewRole(props: {id: string}) {
  const {id} = props;
  console.log(`delete_props=${JSON.stringify(props)}`);
  const role = 
      { 
        id: id
      };
  const res = await API.graphql(graphqlOperation(deleteRole, { input: role }));

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

type roleDataType = {
  id: string,
  name: string,
  lineApiKey: string;
};

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const RoleSetting: React.FC = () => {
  console.log("レンダリング");
  const classes = useStyles();

  const [inputId, setInputId] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [lineApiKey, setLineApiKey] = useState<string>("");
  const [loadFlag, setLoadFlag] = useState<boolean>(true);
  const [createFlag, setCreateFlag] = useState<boolean>(true);
  const [roleList, setRoleList] = useState([]);

  // 書き込み読み込み管理
  const [systemLoadFlag, setSystemLoadFlag] = useState<boolean>(false);

  const setRoleData = (props: roleDataType) => {
    const { id, name, lineApiKey} = props;
    setInputId(id);
    setInputName(name);
    setLineApiKey(lineApiKey);
  };
  
  useEffect(() => {
    // dynamoDBからデータを取得
    const setRoles = async (roleList:any) =>{
      
      if(!loadFlag){
        return;
      }
      
      const list: any = await getlistRole();
      
      if(list.length == 0){
        return;
      }
      
      let setRole: any = [];

      for (let oneRole of list?.data?.listRoles?.items){
        console.log(`oneRole=${JSON.stringify(oneRole)}`);
        setRole.push(oneRole);
      }

      setRoleList(setRole);
      
      setLoadFlag(false);
      // console.log(`roleList=${JSON.stringify(roleList)}`);
    };
    setRoles(roleList);
  }, [roleList, loadFlag, inputId])

  console.log(`roleList=${JSON.stringify(roleList)}`);

  // 役職、グループを追加する
  const onAddRole = async() => {

    if (!inputName) {
      alert("役職・グループ名を入力してください");
      return;
    }
    
    const role = {
      roleName: inputName,
      lineApiKey: lineApiKey
    }
    
    const res = await createNewRole(role);

    // DBの再読み込み
    setLoadFlag(true);

    setSystemLoadFlag(false);

  };

  // 役職、グループを変更する
  const chengeRole = async() => {

    if (!inputId) {
      alert("IDがありません。");
      return;
    }
    
    const updateRole = {
      id: inputId,
      roleName: inputName,
      lineApiKey: lineApiKey
    }
    
    const res = await updateChengeRole(updateRole);

    // DBの再読み込み
    setLoadFlag(true);

    setSystemLoadFlag(false);
    
  };

  // 役職、グループを変更する
  const onDeleteRole = async() => {

    if (!inputId) {
      alert("IDがありません。");
      return;
    }
    
    const res = await deleteNewRole({id: inputId});

    // DBの再読み込み
    setLoadFlag(true);

    setSystemLoadFlag(false);
    
  };

  const nameElement = (
    <div>
      <label>　　　　　名前</label>
      <input
        type="text"
        value={inputName}
        name="inputName"
        onChange={(e) => {
          setInputName(e.target.value);
        }}
      />
    </div>
  );

  const lineApiKeyElement = (
    <div>
      <label>LineのAPIキー</label>
        <input
          type="text"
          value={lineApiKey}
          name="lineApiKey"
          onChange={(e) => {
            setLineApiKey(e.target.value);
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
          setRoleData({id: '', name: '', lineApiKey: ''});
          setCreateFlag(true);
        }}
      />
      {createFlag ? (
        <input
          type="button"
          value="保存"
          onClick={() => {
            setSystemLoadFlag(true);
            onAddRole();
            setRoleData({id: '', name: '', lineApiKey: ''});
            // setInView(false);
          }}
        />
      ):(
        <input
          type="button"
          value="変更"
          onClick={() => {
            setSystemLoadFlag(true);
            chengeRole();
            setRoleData({id: '', name: '', lineApiKey: ''});
            setCreateFlag(true);
          }}
        />
      )}
      {createFlag ? null:(
        <input
          type="button"
          value="削除"
          onClick={() => {
            setSystemLoadFlag(true);
            onDeleteRole();
            setRoleData({id: '', name: '', lineApiKey: ''});
            setCreateFlag(true);
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
        <div>役職・グループ一覧</div>
        {nameElement}
        {lineApiKeyElement}
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
            <TableCell>役職</TableCell>
            <TableCell>LINEAPIキー</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roleList.map((row: any, index: any) => (
            <TableRow
              key={row.roleName}
              onClick={() => {
                let inputID = roleList[index]['id'];

                let inputName: string = '';
                if(roleList[index]['lineApiKey']){
                  inputName = roleList[index]['roleName'];
                }
                
                let inputApiKey: string = '';
                if(roleList[index]['lineApiKey']){
                  inputApiKey = roleList[index]['lineApiKey'];
                }
                
                setRoleData({id: inputID, name: inputName, lineApiKey: inputApiKey});
                setCreateFlag(false);
              }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.roleName}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.lineApiKey}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      )}
    </>
  );
};

export default RoleSetting;
