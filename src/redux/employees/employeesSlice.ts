import { createSlice } from "@reduxjs/toolkit";

enum Position {
  CEO = "CEO",
  HEAD = "HEAD",
  TEAM_LEADER = "TEAM LEADER",
  TEAM_MEMBER = "TEAM MEMBER",
}

export interface Employee {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  position: Position;
  subordinates?: Employee[]
}

export interface Head extends Employee {
    department: string
}

export interface Ceo extends Employee {
    subordinates: Head[]
}

interface InitialState {
  ceo: Ceo
}

const initialState: InitialState = {
  ceo: {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    name: "John Doe",
    position: Position.CEO,
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    subordinates: [
      {
        id: "1d31d68e-ee0d-4a4a-bf19-7b78a65e3d25",
        name: "Alice Smith",
        position: Position.HEAD,
        email: "alice.smith@example.com",
        phoneNumber: "987-654-3210",
        department: "HR",
        subordinates: [
          {
            id: "6a5c4e42-d63d-40f6-a6ee-5bc16e96b59d",
            name: "Bob Brown",
            position: Position.TEAM_LEADER,
            email: "bob.brown@example.com",
            phoneNumber: "555-555-5555",
            subordinates: [
              {
                id: "f3e5a3fb-f193-4c76-9e7a-0268e04aaf5f",
                name: "Emily Davis",
                position: Position.TEAM_MEMBER,
                email: "emily.davis@example.com",
                phoneNumber: "222-333-4444",
              },
              {
                id: "b8a2154b-73dc-48b0-8e21-cd8b885ea8b5",
                name: "Michael Wilson",
                position: Position.TEAM_MEMBER,
                email: "michael.wilson@example.com",
                phoneNumber: "888-999-0000",
              },
            ],
          },
          {
            id: "13453ab8-8c82-48f0-9423-65db81e86e6f",
            name: "Sarah Taylor",
            position: Position.TEAM_LEADER,
            email: "sarah.taylor@example.com",
            phoneNumber: "555-123-4567",
            subordinates: [
              {
                id: "f9b5d5ae-6e92-48b3-8926-17fc73c64f45",
                name: "David Martinez",
                position: Position.TEAM_MEMBER,
                email: "david.martinez@example.com",
                phoneNumber: "111-222-3333",
              },
              {
                id: "1fa82c96-d0f5-4452-bb95-8d959de4a55d",
                name: "Jessica Anderson",
                position: Position.TEAM_MEMBER,
                email: "jessica.anderson@example.com",
                phoneNumber: "777-888-9999",
              },
            ],
          },
        ],
      },
      {
        id: "35f393ae-7749-4c52-a9ac-32b090855de5",
        name: "Michael Johnson",
        position: Position.HEAD,
        email: "michael.johnson@example.com",
        phoneNumber: "444-555-6666",
        department: "Engineering",
        subordinates: [
          {
            id: "6aaf6011-f8b5-48b5-a3f6-82a3d9518e3c",
            name: "Christopher Lee",
            position: Position.TEAM_LEADER,
            email: "christopher.lee@example.com",
            phoneNumber: "123-123-1234",
            subordinates: [
              {
                id: "5d6d77b1-cb9b-4048-8467-8d5e7be2b9ac",
                name: "Karen Johnson",
                position: Position.TEAM_MEMBER,
                email: "karen.johnson@example.com",
                phoneNumber: "555-987-6543",
              },
              {
                id: "6b144340-6b1a-4b6d-9335-7d6ac9b0f300",
                name: "Kevin Harris",
                position: Position.TEAM_MEMBER,
                email: "kevin.harris@example.com",
                phoneNumber: "222-555-4444",
              },
            ],
          },
          {
            id: "5f168189-90de-42cf-a2c3-25e4c4d0a9f3",
            name: "Anna Clark",
            position: Position.TEAM_LEADER,
            email: "anna.clark@example.com",
            phoneNumber: "333-555-2222",
            subordinates: [
              {
                id: "f69f6e2b-b17b-4d18-88b9-3aa1f54a871f",
                name: "Ryan Garcia",
                position: Position.TEAM_MEMBER,
                email: "ryan.garcia@example.com",
                phoneNumber: "444-555-6666",
              },
              {
                id: "8fc0c066-2b1a-4a2b-a4dd-437eb5c6b8cb",
                name: "Olivia Martin",
                position: Position.TEAM_MEMBER,
                email: "olivia.martin@example.com",
                phoneNumber: "555-333-1111",
              },
            ],
          },
        ],
      },
      {
        id: "25d042a8-8471-4ef5-9f88-5a4fd43789fd",
        name: "Daniel Williams",
        position: Position.HEAD,
        email: "daniel.williams@example.com",
        phoneNumber: "111-111-1111",
        department: "Design",
        subordinates: [
          {
            id: "d256e91d-6b4d-4a2f-b448-dc502ca05c7b",
            name: "Elizabeth White",
            position: Position.TEAM_LEADER,
            email: "elizabeth.white@example.com",
            phoneNumber: "222-222-2222",
            subordinates: [
              {
                id: "981c3c5b-3808-4994-9d7b-c34d8c537d76",
                name: "Andrew Thompson",
                position: Position.TEAM_MEMBER,
                email: "andrew.thompson@example.com",
                phoneNumber: "333-333-3333",
              },
              {
                id: "0be1a8d3-ff5a-47a3-80f8-26e457f14157",
                name: "Patricia Harris",
                position: Position.TEAM_MEMBER,
                email: "patricia.harris@example.com",
                phoneNumber: "444-444-4444",
              },
            ],
          },
          {
            id: "feaa1a69-308b-44de-9b0f-0222298b9d15",
            name: "Michael Thompson",
            position: Position.TEAM_LEADER,
            email: "michael.thompson@example.com",
            phoneNumber: "555-555-5555",
            subordinates: [
              {
                id: "7580785d-fcb5-48b4-8bc0-76cbb5bb8f42",
                name: "Daniel Martinez",
                position: Position.TEAM_MEMBER,
                email: "daniel.martinez@example.com",
                phoneNumber: "666-666-6666",
              },
              {
                id: "39c71552-9e05-49d7-9c89-4fc672aeaf11",
                name: "Amanda Martinez",
                position: Position.TEAM_MEMBER,
                email: "amanda.martinez@example.com",
                phoneNumber: "777-777-7777",
              },
            ],
          },
        ],
      },
    ],
  },
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {}
});

export const {} = employeesSlice.actions

export default employeesSlice.reducer