// import React, { useState } from "react";

// import { Button, Form, Grid, Input, message, Spin, theme } from "antd";

// import {
//   ArrowRightOutlined,
//   MailOutlined,
//   SyncOutlined,
// } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import ForgetPasswordService from "../service/defaultService/authentication/forgotPasswordService";

// const { useToken } = theme;
// const { useBreakpoint } = Grid;

// export default function ForgetPassword() {
//   const service = new ForgetPasswordService();
//   const { token } = useToken();
//   const screens = useBreakpoint();
//   const [resMessage, setResMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const onFinish = (values) => {
//     setIsLoading(true);

//     service
//       .post(values)
//       .then((res) => {
//         message.success(res.data.message);
//         setResMessage(res.data.message);
//       })
//       .catch((err) => {
//         message.error(err.response.data);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   const styles = {
//     container: {
//       backgroundColor: "rgba(240, 240, 240, 0.2)", // Transparent white with some opacity.
//       borderRadius: "10px",
//       backdropFilter: "blur(28px)", // Optional for visual effect.
//       padding: "1rem", // Inner padding.
//       padding: screens.md
//         ? `${token.paddingXL}px`
//         : `${token.sizeXXL}px ${token.padding}px`,
//       width: "auto", // Remove the fixed width for better flexibility.
//       alignSelf: "flex-start", // Align the `div` itself to the right if needed.
//       width: "350px",
//     },
//     footer: {
//       marginTop: token.marginLG,
//       textAlign: "center",
//       width: "100%",
//     },
//     forgotPassword: {
//       paddingTop: "10px",
//       float: "right",
//       color: "white",
//     },
//     header: {
//       marginBottom: token.marginXL,
//     },
//     section: {
//       backgroundColor: token.colorBgContainer,
//       display: "flex",
//       flexDirection: "column", // For vertical stacking; change to "row" if you want a horizontal layout.
//       justifyContent: "center", // Vertically centers items.
//       alignItems: "flex-end", // Aligns items horizontally to the right.
//       minHeight: "100vh", // Ensures full viewport height.
//       backgroundPosition: "center",
//       backgroundSize: "cover",
//       paddingLeft: "5%",
//     },
//     text: {
//       color: "white",
//     },
//     title: {
//       fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
//     },
//   };

//   return (
//     <section
//       style={{
//         ...styles.section,
//         backgroundImage: `url(${process.env.PUBLIC_URL}/loginpageimage.jpg)`,
//       }}
//     >
//       <div
//         style={{
//           ...styles.container,
//         }}
//       >
//         <div style={{ textAlign: "center", paddingBottom: "1rem" }}>
//           <img
//             src={`${process.env.PUBLIC_URL}/edge-logo1.png`}
//             alt="Logo"
//             style={{ width: "75%", height: "auto", borderRadius: "10px" }}
//           />
//         </div>
//         <Form
//           name="normal_login"
//           initialValues={{
//             remember: true,
//           }}
//           onFinish={onFinish}
//           layout="vertical"
//           requiredMark="optional"
//         >
//           {resMessage ? (
//             <h1
//               style={{
//                 textAlign: "center",
//                 paddingBottom: "2rem",
//               }}
//             >
//               {/* {resMessage} */}
//               We've emailed a password reset link. Please check your inbox or
//               spam folder.
//             </h1>
//           ) : (
//             <>
//               <Form.Item
//                 name="email"
//                 label={
//                   <div style={{ color: "white", fontWeight: "700" }}>
//                     EMAIL
//                   </div>
//                 }
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your Email!",
//                   },
//                 ]}
//               >
//                 <Input
//                   prefix={<MailOutlined />}
//                   placeholder="Enter"
//                   style={{ padding: "8px 12px" }}
//                 />
//               </Form.Item>

//               <Form.Item style={{ marginBottom: "0px" }}>
//                 <Button
//                   block="true"
//                   type="primary"
//                   htmlType="submit"
//                   style={{
//                     padding: "20px 12px",
//                     backgroundColor: isLoading ? "#1677ff" : undefined,
//                     borderColor: isLoading ? "#1677ff" : undefined,
//                     cursor: isLoading ? "not-allowed" : undefined,
//                   }}
//                   disabled={isLoading}
//                   icon={
//                     <Spin
//                       spinning={isLoading}
//                       indicator={<SyncOutlined spin />}
//                       // size="small"
//                       style={{ color: "white" }}
//                     />
//                   }
//                 >
//                   {!isLoading ? "Submit" : ""}
//                 </Button>
//               </Form.Item>
//               <Button
//                 style={{
//                   background: "transparent",
//                   border: "none",
//                   padding: "5px",
//                   float: "right",
//                   marginTop: "10px",
//                 }}
//                 disabled={isLoading}
//               >
//                 <Link
//                   to="/login"
//                   style={{
//                     float: "left",
//                     color: "white",
//                   }}
//                 >
//                   Login
//                   <ArrowRightOutlined
//                     style={{ paddingLeft: "3px", marginTop: "7px" }}
//                   />
//                 </Link>
//               </Button>
//             </>
//           )}
//         </Form>
//       </div>
//     </section>
//   );
// }

 export default function ForgetPassword(){
  return <>forgotPassword</>
 }