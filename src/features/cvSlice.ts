import { createSlice } from '@reduxjs/toolkit'
import { CVModel } from '../models/index'

type CVSliceStateProps = {
  fetchingCVs: boolean
  CVs: CVModel[]
  curCV: CVModel
}

const initialState: CVSliceStateProps = {
  fetchingCVs: false,
  CVs: [],
  curCV: {
    name: '',
    studentName: '',
    position: '',
    content: '',
    details: {
      student: [],
      contacts: [],
      skills: [],
      certificated: [],
      project: [],
    },
  },
  // curCV: {
  //   id: 'D6A26C04-AFD3-41D7-AE77-1DE434264040',
  //   studentName: 'Vương Đình Khôi',
  //   position: 'Fullstack Developer',
  //   content: 'Focus on Fullstack Developer.',
  //   slug: 'vuong[object Object]dinh[object Object]khoi',
  //   isActive: true,
  //   isRegistered: true,
  //   createdAt: '2022-05-05T15:09:24.000Z',
  //   updatedAt: '2022-05-05T15:09:24.000Z',
  //   images: [],
  //   details: {
  //     student: [
  //       {
  //         id: '603E8F2C-430C-4010-8874-105CDE9366DA',
  //         firstName: 'Khôi',
  //         lastName: 'Vương Đình',
  //         fullName: 'Vương Đình Khôi',
  //         email: '18dh110815@st.huflit.edu.vn',
  //         birthDate: '01/30/2000',
  //         identityNumber: '18DH110815',
  //         address: '882 Ngo Quyen Street, Ho Chi Minh City,Vietnam',
  //         phoneNumber: '0777724500',
  //         class: 'PM1804',
  //         term: 'K24',
  //         status: 'Chưa thực tập',
  //         academicYear: 'K24',
  //         slug: 'vuong-dinh-khoi',
  //         isActive: true,
  //         isRegistered: true,
  //         createdAt: '2022-05-05T15:06:46',
  //         updatedAt: '2022-05-05T15:06:46',
  //       },
  //     ],
  //     contacts: [
  //       {
  //         id: '1D461274-9BDD-4E3F-9CAB-EFA70F1D9A9C',
  //         title: 'Birthday',
  //         content: '04/05/2000',
  //         isActive: true,
  //         isRegistered: true,
  //         createdAt: '2022-05-05T15:10:50',
  //         updatedAt: '2022-05-05T15:10:50',
  //       },
  //       {
  //         id: '5632C028-76C9-4000-AC0F-752CD4B1BB30',
  //         title: 'Address',
  //         content: '88/89/15/5 Nguyễn Văn Quỳ Phường Phú Thuận Quận 07',
  //         isActive: true,
  //         isRegistered: true,
  //         createdAt: '2022-05-05T15:10:50',
  //         updatedAt: '2022-05-05T15:10:50',
  //       },
  //       {
  //         id: '863FB10B-B950-4199-9BF9-AB1862770400',
  //         title: 'Linkedln',
  //         content: 'ABCXYZGHIKLM',
  //         isActive: true,
  //         isRegistered: true,
  //         createdAt: '2022-05-05T15:10:50',
  //         updatedAt: '2022-05-05T15:10:50',
  //       },
  //       {
  //         id: 'BD0F5AAC-32B2-43C2-B61F-5205F07B11AB',
  //         title: 'Phone Number',
  //         content: '0777724410',
  //         isActive: true,
  //         isRegistered: true,
  //         createdAt: '2022-05-05T15:10:50',
  //         updatedAt: '2022-05-05T15:10:50',
  //       },
  //     ],
  //     skills: [
  //       {
  //         id: '89F6DB31-2B67-4043-8406-B61D35002607',
  //         name: 'ReactJS',
  //         rating: 4,
  //         slug: 'reactjs',
  //         isActive: true,
  //         isRegistered: true,
  //         createdAt: '2022-05-05T15:10:31',
  //         updatedAt: '2022-05-05T15:10:31',
  //       },
  //       {
  //         id: '97825D72-0E6D-4C29-B993-0EE2BFE9E8BB',
  //         name: 'Python',
  //         rating: 4,
  //         slug: 'python',
  //         isActive: true,
  //         isRegistered: true,
  //         createdAt: '2022-05-05T15:10:31',
  //         updatedAt: '2022-05-05T15:10:31',
  //       },
  //       {
  //         id: 'C3A3C7FF-DD11-4069-BF37-4AF57B767A83',
  //         name: 'NodeJS',
  //         rating: 4,
  //         slug: 'nodejs',
  //         isActive: true,
  //         isRegistered: true,
  //         createdAt: '2022-05-05T15:10:31',
  //         updatedAt: '2022-05-05T15:10:31',
  //       },
  //       {
  //         id: 'ED680A63-8F05-4FB8-A130-80A846AAA2B9',
  //         name: 'Javascript',
  //         rating: 4,
  //         slug: 'javascript',
  //         isActive: true,
  //         isRegistered: true,
  //         createdAt: '2022-05-05T15:10:31',
  //         updatedAt: '2022-05-05T15:10:31',
  //       },
  //     ],
  //     certificated: [
  //       {
  //         id: '3CCC525D-5B71-4850-9558-707D0D632B5B',
  //         name: 'TOEIC',
  //         issueDate: '2022-04-22',
  //         organizer: 'IIG VietNam',
  //         isActive: true,
  //         isRegistered: true,
  //         createdAt: '2022-05-05T15:11:00',
  //         updatedAt: '2022-05-05T15:11:00',
  //       },
  //       {
  //         id: 'AA1A56EB-DBD8-4BCC-9D0D-F8D2B52306CF',
  //         name: 'Software Engineering',
  //         issueDate: '2022-04-21',
  //         organizer: 'HUFLIT',
  //         isActive: true,
  //         isRegistered: true,
  //         createdAt: '2022-05-05T15:11:00',
  //         updatedAt: '2022-05-05T15:11:00',
  //       },
  //       {
  //         id: 'D8F8B58F-6161-4C94-B4C2-351522F94648',
  //         name: 'AWS SERVICES',
  //         issueDate: '2022-04-21',
  //         organizer: 'Amazon Web Services',
  //         isActive: true,
  //         isRegistered: true,
  //         createdAt: '2022-05-05T15:11:00',
  //         updatedAt: '2022-05-05T15:11:00',
  //       },
  //     ],
  //     project: [
  //       {
  //         id: '5AB37C4C-7F3B-4F68-8990-74374238E609',
  //         projectName: 'eShop',
  //         startDate: '2022-04-21',
  //         endDate: '2023-04-20',
  //         teamSize: '4',
  //         role: 'Backend Developer',
  //         responsibilities: 'Response to build backend server in e-commercial application',
  //         sourceLink: 'https://www.facebook.com/',
  //         description: 'Website Application E-Commercial Style For Marketing Convenience',
  //         isActive: true,
  //         isRegistered: true,
  //         createdAt: '2022-05-05T15:11:15',
  //         updatedAt: '2022-05-05T15:11:15',
  //         technology: [
  //           {
  //             id: 'BC770100-4E0B-4B70-89F1-4ED7D53C02BB',
  //             title: 'MSSQL',
  //             content: 'Database for CRUD data in our server',
  //             isActive: true,
  //             isRegistered: true,
  //             createdAt: '2022-05-05T15:11:15',
  //             updatedAt: '2022-05-05T15:11:15',
  //           },
  //           {
  //             id: 'C2EA97B0-9600-4AAB-8434-572862E7B375',
  //             title: 'NodeJS',
  //             content: 'Development Environment For UI and Server',
  //             isActive: true,
  //             isRegistered: true,
  //             createdAt: '2022-05-05T15:11:15',
  //             updatedAt: '2022-05-05T15:11:15',
  //           },
  //         ],
  //       },
  //       {
  //         id: 'E33B9789-2702-4532-8759-4FD2BA9C53C2',
  //         projectName: 'Traveloka Clone',
  //         startDate: '2022-04-21',
  //         endDate: '2023-04-20',
  //         teamSize: '4',
  //         role: 'Backend Developer',
  //         responsibilities: 'Response to build backend server in booking application',
  //         sourceLink: 'https://www.facebook.com/',
  //         description: 'Website Application Booking Style For Marketing Convenience',
  //         isActive: true,
  //         isRegistered: true,
  //         createdAt: '2022-05-05T15:11:15',
  //         updatedAt: '2022-05-05T15:11:15',
  //         technology: [
  //           {
  //             id: '9619A269-684F-4B14-8FCF-1159B1DC0D76',
  //             title: 'NodeJS',
  //             content: 'Development Environment For UI and Server',
  //             isActive: true,
  //             isRegistered: true,
  //             createdAt: '2022-05-05T15:11:15',
  //             updatedAt: '2022-05-05T15:11:15',
  //           },
  //           {
  //             id: '9D0D5354-BDDC-4E55-B740-A8508818325F',
  //             title: 'MSSQL',
  //             content: 'Database for CRUD data in our server',
  //             isActive: true,
  //             isRegistered: true,
  //             createdAt: '2022-05-05T15:11:15',
  //             updatedAt: '2022-05-05T15:11:15',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // },
}

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    addCVName(state, action) {
      state.curCV.name = action.payload
    },
    addListSkill(state, action) {
      state.curCV.details.skills = action.payload
    },
    addProject(state, action) {
      state.curCV.details.project.push(action.payload)
    },
  },
  extraReducers: {},
})

export const { addListSkill, addCVName, addProject } = cvSlice.actions

export default cvSlice.reducer
