/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      owner
      updatedAt
      createdAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $id: ID
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTodos(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        owner
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getEvents = /* GraphQL */ `
  query GetEvents($id: ID!) {
    getEvents(id: $id) {
      id
      title
      startTime
      endTime
      targets
      remarks
      sendFlag
      owner
      updatedAt
      createdAt
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $id: ID
    $filter: ModelEventsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEvents(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        title
        startTime
        endTime
        targets
        remarks
        sendFlag
        owner
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      userId
      password
      owner
      updatedAt
      createdAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userId
        password
        owner
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getRole = /* GraphQL */ `
  query GetRole($id: ID!) {
    getRole(id: $id) {
      id
      roleName
      lineApiKey
      owner
      updatedAt
      createdAt
    }
  }
`;
export const listRoles = /* GraphQL */ `
  query ListRoles(
    $id: ID
    $filter: ModelRoleFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRoles(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        roleName
        lineApiKey
        owner
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getRoleGroup = /* GraphQL */ `
  query GetRoleGroup($id: ID!) {
    getRoleGroup(id: $id) {
      id
      groupName
      roleGroupId
      owner
      updatedAt
      createdAt
    }
  }
`;
export const listRoleGroups = /* GraphQL */ `
  query ListRoleGroups(
    $id: ID
    $filter: ModelRoleGroupFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRoleGroups(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        groupName
        roleGroupId
        owner
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getUserSetting = /* GraphQL */ `
  query GetUserSetting($id: ID!) {
    getUserSetting(id: $id) {
      id
      userName
      userRoleID
      owner
      updatedAt
      createdAt
    }
  }
`;
export const listUserSettings = /* GraphQL */ `
  query ListUserSettings(
    $id: ID
    $filter: ModelUserSettingFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserSettings(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userName
        userRoleID
        owner
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
