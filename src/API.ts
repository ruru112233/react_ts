/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodoInput = {
  id?: string | null,
  name: string,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type ModelTodoConditionInput = {
  name?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Todo = {
  __typename: "Todo",
  id: string,
  name: string,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type UpdateTodoInput = {
  id: string,
  name?: string | null,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type DeleteTodoInput = {
  id: string,
};

export type CreateEventsInput = {
  id?: string | null,
  title?: string | null,
  startTime?: string | null,
  endTime?: string | null,
  targets?: Array< string | null > | null,
  remarks?: string | null,
  sendFlag?: number | null,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type ModelEventsConditionInput = {
  title?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  endTime?: ModelStringInput | null,
  targets?: ModelStringInput | null,
  remarks?: ModelStringInput | null,
  sendFlag?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelEventsConditionInput | null > | null,
  or?: Array< ModelEventsConditionInput | null > | null,
  not?: ModelEventsConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Events = {
  __typename: "Events",
  id: string,
  title?: string | null,
  startTime?: string | null,
  endTime?: string | null,
  targets?: Array< string | null > | null,
  remarks?: string | null,
  sendFlag?: number | null,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type UpdateEventsInput = {
  id: string,
  title?: string | null,
  startTime?: string | null,
  endTime?: string | null,
  targets?: Array< string | null > | null,
  remarks?: string | null,
  sendFlag?: number | null,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type DeleteEventsInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  userId?: string | null,
  password?: string | null,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type ModelUserConditionInput = {
  userId?: ModelStringInput | null,
  password?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  userId?: string | null,
  password?: string | null,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type UpdateUserInput = {
  id: string,
  userId?: string | null,
  password?: string | null,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateRoleInput = {
  id?: string | null,
  roleName?: string | null,
  lineApiKey?: string | null,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type ModelRoleConditionInput = {
  roleName?: ModelStringInput | null,
  lineApiKey?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelRoleConditionInput | null > | null,
  or?: Array< ModelRoleConditionInput | null > | null,
  not?: ModelRoleConditionInput | null,
};

export type Role = {
  __typename: "Role",
  id: string,
  roleName?: string | null,
  lineApiKey?: string | null,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type UpdateRoleInput = {
  id: string,
  roleName?: string | null,
  lineApiKey?: string | null,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type DeleteRoleInput = {
  id: string,
};

export type CreateRoleGroupInput = {
  id?: string | null,
  groupName?: string | null,
  roleGroupId?: Array< string | null > | null,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type ModelRoleGroupConditionInput = {
  groupName?: ModelStringInput | null,
  roleGroupId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelRoleGroupConditionInput | null > | null,
  or?: Array< ModelRoleGroupConditionInput | null > | null,
  not?: ModelRoleGroupConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type RoleGroup = {
  __typename: "RoleGroup",
  id: string,
  groupName?: string | null,
  roleGroupId?: Array< string | null > | null,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type UpdateRoleGroupInput = {
  id: string,
  groupName?: string | null,
  roleGroupId?: Array< string | null > | null,
  owner?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type DeleteRoleGroupInput = {
  id: string,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items:  Array<Todo | null >,
  nextToken?: string | null,
};

export type ModelEventsFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  endTime?: ModelStringInput | null,
  targets?: ModelStringInput | null,
  remarks?: ModelStringInput | null,
  sendFlag?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelEventsFilterInput | null > | null,
  or?: Array< ModelEventsFilterInput | null > | null,
  not?: ModelEventsFilterInput | null,
};

export type ModelEventsConnection = {
  __typename: "ModelEventsConnection",
  items:  Array<Events | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  password?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelRoleFilterInput = {
  id?: ModelIDInput | null,
  roleName?: ModelStringInput | null,
  lineApiKey?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelRoleFilterInput | null > | null,
  or?: Array< ModelRoleFilterInput | null > | null,
  not?: ModelRoleFilterInput | null,
};

export type ModelRoleConnection = {
  __typename: "ModelRoleConnection",
  items:  Array<Role | null >,
  nextToken?: string | null,
};

export type ModelRoleGroupFilterInput = {
  id?: ModelIDInput | null,
  groupName?: ModelStringInput | null,
  roleGroupId?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelRoleGroupFilterInput | null > | null,
  or?: Array< ModelRoleGroupFilterInput | null > | null,
  not?: ModelRoleGroupFilterInput | null,
};

export type ModelRoleGroupConnection = {
  __typename: "ModelRoleGroupConnection",
  items:  Array<RoleGroup | null >,
  nextToken?: string | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type CreateEventsMutationVariables = {
  input: CreateEventsInput,
  condition?: ModelEventsConditionInput | null,
};

export type CreateEventsMutation = {
  createEvents?:  {
    __typename: "Events",
    id: string,
    title?: string | null,
    startTime?: string | null,
    endTime?: string | null,
    targets?: Array< string | null > | null,
    remarks?: string | null,
    sendFlag?: number | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type UpdateEventsMutationVariables = {
  input: UpdateEventsInput,
  condition?: ModelEventsConditionInput | null,
};

export type UpdateEventsMutation = {
  updateEvents?:  {
    __typename: "Events",
    id: string,
    title?: string | null,
    startTime?: string | null,
    endTime?: string | null,
    targets?: Array< string | null > | null,
    remarks?: string | null,
    sendFlag?: number | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type DeleteEventsMutationVariables = {
  input: DeleteEventsInput,
  condition?: ModelEventsConditionInput | null,
};

export type DeleteEventsMutation = {
  deleteEvents?:  {
    __typename: "Events",
    id: string,
    title?: string | null,
    startTime?: string | null,
    endTime?: string | null,
    targets?: Array< string | null > | null,
    remarks?: string | null,
    sendFlag?: number | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    userId?: string | null,
    password?: string | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    userId?: string | null,
    password?: string | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    userId?: string | null,
    password?: string | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type CreateRoleMutationVariables = {
  input: CreateRoleInput,
  condition?: ModelRoleConditionInput | null,
};

export type CreateRoleMutation = {
  createRole?:  {
    __typename: "Role",
    id: string,
    roleName?: string | null,
    lineApiKey?: string | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type UpdateRoleMutationVariables = {
  input: UpdateRoleInput,
  condition?: ModelRoleConditionInput | null,
};

export type UpdateRoleMutation = {
  updateRole?:  {
    __typename: "Role",
    id: string,
    roleName?: string | null,
    lineApiKey?: string | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type DeleteRoleMutationVariables = {
  input: DeleteRoleInput,
  condition?: ModelRoleConditionInput | null,
};

export type DeleteRoleMutation = {
  deleteRole?:  {
    __typename: "Role",
    id: string,
    roleName?: string | null,
    lineApiKey?: string | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type CreateRoleGroupMutationVariables = {
  input: CreateRoleGroupInput,
  condition?: ModelRoleGroupConditionInput | null,
};

export type CreateRoleGroupMutation = {
  createRoleGroup?:  {
    __typename: "RoleGroup",
    id: string,
    groupName?: string | null,
    roleGroupId?: Array< string | null > | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type UpdateRoleGroupMutationVariables = {
  input: UpdateRoleGroupInput,
  condition?: ModelRoleGroupConditionInput | null,
};

export type UpdateRoleGroupMutation = {
  updateRoleGroup?:  {
    __typename: "RoleGroup",
    id: string,
    groupName?: string | null,
    roleGroupId?: Array< string | null > | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type DeleteRoleGroupMutationVariables = {
  input: DeleteRoleGroupInput,
  condition?: ModelRoleGroupConditionInput | null,
};

export type DeleteRoleGroupMutation = {
  deleteRoleGroup?:  {
    __typename: "RoleGroup",
    id: string,
    groupName?: string | null,
    roleGroupId?: Array< string | null > | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type ListTodosQueryVariables = {
  id?: string | null,
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      id: string,
      name: string,
      owner?: string | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetEventsQueryVariables = {
  id: string,
};

export type GetEventsQuery = {
  getEvents?:  {
    __typename: "Events",
    id: string,
    title?: string | null,
    startTime?: string | null,
    endTime?: string | null,
    targets?: Array< string | null > | null,
    remarks?: string | null,
    sendFlag?: number | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type ListEventsQueryVariables = {
  id?: string | null,
  filter?: ModelEventsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListEventsQuery = {
  listEvents?:  {
    __typename: "ModelEventsConnection",
    items:  Array< {
      __typename: "Events",
      id: string,
      title?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      targets?: Array< string | null > | null,
      remarks?: string | null,
      sendFlag?: number | null,
      owner?: string | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    userId?: string | null,
    password?: string | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  id?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      userId?: string | null,
      password?: string | null,
      owner?: string | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRoleQueryVariables = {
  id: string,
};

export type GetRoleQuery = {
  getRole?:  {
    __typename: "Role",
    id: string,
    roleName?: string | null,
    lineApiKey?: string | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type ListRolesQueryVariables = {
  id?: string | null,
  filter?: ModelRoleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListRolesQuery = {
  listRoles?:  {
    __typename: "ModelRoleConnection",
    items:  Array< {
      __typename: "Role",
      id: string,
      roleName?: string | null,
      lineApiKey?: string | null,
      owner?: string | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRoleGroupQueryVariables = {
  id: string,
};

export type GetRoleGroupQuery = {
  getRoleGroup?:  {
    __typename: "RoleGroup",
    id: string,
    groupName?: string | null,
    roleGroupId?: Array< string | null > | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type ListRoleGroupsQueryVariables = {
  id?: string | null,
  filter?: ModelRoleGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListRoleGroupsQuery = {
  listRoleGroups?:  {
    __typename: "ModelRoleGroupConnection",
    items:  Array< {
      __typename: "RoleGroup",
      id: string,
      groupName?: string | null,
      roleGroupId?: Array< string | null > | null,
      owner?: string | null,
      updatedAt?: string | null,
      createdAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnCreateEventsSubscription = {
  onCreateEvents?:  {
    __typename: "Events",
    id: string,
    title?: string | null,
    startTime?: string | null,
    endTime?: string | null,
    targets?: Array< string | null > | null,
    remarks?: string | null,
    sendFlag?: number | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnUpdateEventsSubscription = {
  onUpdateEvents?:  {
    __typename: "Events",
    id: string,
    title?: string | null,
    startTime?: string | null,
    endTime?: string | null,
    targets?: Array< string | null > | null,
    remarks?: string | null,
    sendFlag?: number | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnDeleteEventsSubscription = {
  onDeleteEvents?:  {
    __typename: "Events",
    id: string,
    title?: string | null,
    startTime?: string | null,
    endTime?: string | null,
    targets?: Array< string | null > | null,
    remarks?: string | null,
    sendFlag?: number | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    userId?: string | null,
    password?: string | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    userId?: string | null,
    password?: string | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    userId?: string | null,
    password?: string | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnCreateRoleSubscription = {
  onCreateRole?:  {
    __typename: "Role",
    id: string,
    roleName?: string | null,
    lineApiKey?: string | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnUpdateRoleSubscription = {
  onUpdateRole?:  {
    __typename: "Role",
    id: string,
    roleName?: string | null,
    lineApiKey?: string | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnDeleteRoleSubscription = {
  onDeleteRole?:  {
    __typename: "Role",
    id: string,
    roleName?: string | null,
    lineApiKey?: string | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnCreateRoleGroupSubscription = {
  onCreateRoleGroup?:  {
    __typename: "RoleGroup",
    id: string,
    groupName?: string | null,
    roleGroupId?: Array< string | null > | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnUpdateRoleGroupSubscription = {
  onUpdateRoleGroup?:  {
    __typename: "RoleGroup",
    id: string,
    groupName?: string | null,
    roleGroupId?: Array< string | null > | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};

export type OnDeleteRoleGroupSubscription = {
  onDeleteRoleGroup?:  {
    __typename: "RoleGroup",
    id: string,
    groupName?: string | null,
    roleGroupId?: Array< string | null > | null,
    owner?: string | null,
    updatedAt?: string | null,
    createdAt?: string | null,
  } | null,
};
