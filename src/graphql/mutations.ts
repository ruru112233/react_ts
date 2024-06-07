/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      owner
      updatedAt
      createdAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      owner
      updatedAt
      createdAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      owner
      updatedAt
      createdAt
    }
  }
`;
export const createEvents = /* GraphQL */ `
  mutation CreateEvents(
    $input: CreateEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    createEvents(input: $input, condition: $condition) {
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
export const updateEvents = /* GraphQL */ `
  mutation UpdateEvents(
    $input: UpdateEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    updateEvents(input: $input, condition: $condition) {
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
export const deleteEvents = /* GraphQL */ `
  mutation DeleteEvents(
    $input: DeleteEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    deleteEvents(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      userId
      password
      owner
      updatedAt
      createdAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      userId
      password
      owner
      updatedAt
      createdAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      userId
      password
      owner
      updatedAt
      createdAt
    }
  }
`;
export const createRole = /* GraphQL */ `
  mutation CreateRole(
    $input: CreateRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    createRole(input: $input, condition: $condition) {
      id
      roleName
      lineApiKey
      owner
      updatedAt
      createdAt
    }
  }
`;
export const updateRole = /* GraphQL */ `
  mutation UpdateRole(
    $input: UpdateRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    updateRole(input: $input, condition: $condition) {
      id
      roleName
      lineApiKey
      owner
      updatedAt
      createdAt
    }
  }
`;
export const deleteRole = /* GraphQL */ `
  mutation DeleteRole(
    $input: DeleteRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    deleteRole(input: $input, condition: $condition) {
      id
      roleName
      lineApiKey
      owner
      updatedAt
      createdAt
    }
  }
`;
export const createRoleGroup = /* GraphQL */ `
  mutation CreateRoleGroup(
    $input: CreateRoleGroupInput!
    $condition: ModelRoleGroupConditionInput
  ) {
    createRoleGroup(input: $input, condition: $condition) {
      id
      groupName
      roleGroupId
      owner
      updatedAt
      createdAt
    }
  }
`;
export const updateRoleGroup = /* GraphQL */ `
  mutation UpdateRoleGroup(
    $input: UpdateRoleGroupInput!
    $condition: ModelRoleGroupConditionInput
  ) {
    updateRoleGroup(input: $input, condition: $condition) {
      id
      groupName
      roleGroupId
      owner
      updatedAt
      createdAt
    }
  }
`;
export const deleteRoleGroup = /* GraphQL */ `
  mutation DeleteRoleGroup(
    $input: DeleteRoleGroupInput!
    $condition: ModelRoleGroupConditionInput
  ) {
    deleteRoleGroup(input: $input, condition: $condition) {
      id
      groupName
      roleGroupId
      owner
      updatedAt
      createdAt
    }
  }
`;
export const createUserSetting = /* GraphQL */ `
  mutation CreateUserSetting(
    $input: CreateUserSettingInput!
    $condition: ModelUserSettingConditionInput
  ) {
    createUserSetting(input: $input, condition: $condition) {
      id
      userName
      userRoleID
      owner
      updatedAt
      createdAt
    }
  }
`;
export const updateUserSetting = /* GraphQL */ `
  mutation UpdateUserSetting(
    $input: UpdateUserSettingInput!
    $condition: ModelUserSettingConditionInput
  ) {
    updateUserSetting(input: $input, condition: $condition) {
      id
      userName
      userRoleID
      owner
      updatedAt
      createdAt
    }
  }
`;
export const deleteUserSetting = /* GraphQL */ `
  mutation DeleteUserSetting(
    $input: DeleteUserSettingInput!
    $condition: ModelUserSettingConditionInput
  ) {
    deleteUserSetting(input: $input, condition: $condition) {
      id
      userName
      userRoleID
      owner
      updatedAt
      createdAt
    }
  }
`;
