import { Link, Navigate, useNavigate, useRoutes } from "react-router-dom";
// import AssetDashboard from "../module/assetDashboard";
// import Energy from "../module/Energy/energy";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, Layout, Menu, message } from "antd";
import { useEffect, useState } from "react";
import { Content, Header } from "antd/es/layout/layout";
// import ControlePanel from "../module/ControlePanel/Component/controlePanel";
import Cookies from "js-cookie";
import { getCurrentUser, logout } from "../basicService/authService";
import { TbPasswordFingerprint } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
// import Configuration from "../module/configuraion/index.js";
// import EnergyDashboardIndex from "../module/EnergyModule/index.js";

const Homepage = () => {
  const [current, setCurrent] = useState("mail");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const token = Cookies.get("login_token");
  // const token = true;
  const navigate = useNavigate();
  // const service = new CurrentUserService();

  const dropDownStyle = {
    background: "none",
    fontSize: "16px",
    padding: "0px",
  };

  const menuItem = [
    {
      label: <Link to={"/"}>Dashboard</Link>,
      key: "dashboard",
      icon: <SettingOutlined />,
    },
    {
      label: <Link to={"/energy"}>Energy</Link>,
      key: "energy",
      icon: <SettingOutlined />,
    },
    {
      label: "Configuration",
      icon: <SettingOutlined />,
      children: [
        {
          label: "Firm",
          key: "firm",
          children: [
            {
              label: <Link to={"/configuration/firm/location"}>Location</Link>,
              key: "location",
            },
            {
              label: <Link to={"/configuration/firm"}>Firm</Link>,
              key: "firm",
            },
          ],
        },
        {
          label: "User",
          key: "user-group",
          children: [
            {
              label: <Link to={"/configuration/user"}>User</Link>,
              key: "user",
            },
            {
              label: <Link to={"/configuration/user/role"}>Role</Link>,
              key: "role",
            },
          ],
        },
        {
          label: "Shift",
          key: "shift",
          children: [
            {
              label: <Link to={"/configuration/shift/break"}>Break</Link>,
              key: "break",
            },
            {
              label: <Link to={"/configuration/shift"}>Shift</Link>,
              key: "shift",
            },
            {
              label: (
                <Link to={"/configuration/shift/allocation"}>Allocation</Link>
              ),
              key: "allocation",
            },
          ],
        },

        {
          label: "Asset",
          key: "asset",
          children: [
            {
              label: <Link to={"/configuration/asset"}>Asset</Link>,
              key: "asset",
            },
            {
              label: (
                <Link to={"/configuration/asset/iot-gateway"}>
                  IOT Gate way
                </Link>
              ),
              key: "iot-gateway",
            },
            {
              label: <Link to={"/configuration/asset/script"}>Script</Link>,
              key: "script",
            },
            {
              label: <Link to={"/configuration/asset/mqtt"}>MQTT</Link>,
              key: "mqtt",
            },
          ],
        },
      ],
    },
    {
      label: "Report",
      key: "report",
      icon: <SettingOutlined />,
      children: [
        {
          label: <Link to={"/factory"}>Factory</Link>,
          key: "factory",
        },
        {
          label: <Link to={"/machine"}>Machine</Link>,
          key: "machine",
        },
      ],
    },
    {
      label: <Link to={"/utility"}>Utility</Link>,
      key: "utility",
      icon: <SettingOutlined />,
    },
    {
      label: "Control Panel",
      key: "controlPanel",
      icon: <SettingOutlined />,
      children: [
        {
          label: <Link to={"controle-panel/asset"}>Firm</Link>,
          key: "firm",
        },
        {
          label: "Asset Configuration",
          key: "asset-configuration",
          icon: <SettingOutlined />,
          children: [
            {
              label: (
                <Link to={"controle-panel/asset-configuration/asset"}>
                  Asset
                </Link>
              ),
              key: "asset",
            },
            {
              label: (
                <Link to={"controle-panel/asset-configuration/iot-gateway"}>
                  IOT Gateway
                </Link>
              ),
              key: "iot-gateway",
            },
          ],
        },
        {
          label: "User Management",
          key: "user-management",
          icon: <SettingOutlined />,
          children: [
            {
              label: (
                <Link to={"controle-panel/user-management/role"}>Role</Link>
              ),
              key: "role",
            },
            {
              label: (
                <Link to={"controle-panel/user-management/user"}>User</Link>
              ),
              key: "user",
            },
            {
              label: (
                <Link to={"controle-panel/user-management/user-access"}>
                  User Access
                </Link>
              ),
              key: "user-access",
            },
          ],
        },
        {
          label: "Shift Configuration",
          key: "shift-configuration",
          icon: <SettingOutlined />,
          children: [
            {
              label: (
                <Link to={"controle-panel/shift-configuration/shift-slot"}>
                  Shift Slot
                </Link>
              ),
              key: "shift-slot",
            },
            {
              label: (
                <Link
                  to={"controle-panel/shift-configuration/shift-allocation"}
                >
                  Shift Allocation
                </Link>
              ),
              key: "iot-allocation",
            },
          ],
        },
      ],
    },
  ];
  const onClick = (e) => {
    setCurrent(e.key);
  };

  // const router = useRoutes([
  //   { index: true, element: <AssetDashboard /> },
  //   { element: <Configuration />, path: "configuration/*" },
  //   {
  //     element: <ControlePanel />,
  //     path: "controle-panel/*",
  //   },
  //   { element: <Energy />, path: "energy" },
  //   { element: <EnergyDashboardIndex />, path: "energy-module/*" },
  // ]);

  const handleLogout = async () => {
    console.log("hit");
    setIsLoading(true);
    try {
      const res = await logout();

      Cookies.remove("login_token");
      navigate("/login", { replace: true });
    } catch (err) {
      message.error(err.response?.data?.message || "Logout failed");
    } finally {
      setIsLoading(false);
    }
  };
  // Function to refresh the token expiration on user activity
  const refreshTokenExpiration = () => {
    const expirationTime = new Date(new Date().getTime() + 10 * 60 * 1000); // 10 minutes
    const token = Cookies.get("login_token");
    if (token) {
      Cookies.set("login_token", token, { expires: expirationTime });
    }
  };
  useEffect(() => {
    const token = Cookies.get("login_token");

    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setCurrentUser(res.data?.data);
      } catch (err) {
        message.error(err?.response?.data?.message || "Failed to fetch data");
      }
    };
    if (token) {
      fetchUser();
    }

    // Add event listeners for user activity
    window.addEventListener("mousemove", refreshTokenExpiration);
    window.addEventListener("keydown", refreshTokenExpiration);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", refreshTokenExpiration);
      window.removeEventListener("keydown", refreshTokenExpiration);
    };
  }, []);

  return token ? (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ background: "#fff" }}
      >
        <div
          style={{
            height: 64,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
            padding: "1rem",
          }}
        >
          LOGO
        </div>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          items={menuItem}
          style={{ height: "100%", borderRight: 0 }}
        />
        <Button
          type="text"
          onClick={() => {
            console.log("insite hit")
            handleLogout()
          }}
          style={dropDownStyle}
        >
          Logout
        </Button>
      </Layout.Sider>

      {/* Main Content Area */}
      <Layout>
        <Header
          style={{
            padding: "0 1rem",
            background: "#fff",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* Right-side Dropdown */}
          <Dropdown
            menu={{
              items: [
                {
                  key: 1,
                  label: (
                    <Button
                      type="text"
                      style={dropDownStyle}
                      onClick={() => {
                        console.log("profile");
                      }}
                    >
                      Profile
                    </Button>
                  ),
                },
                {
                  key: 2,
                  label: (
                    <Button type="text" style={dropDownStyle}>
                      Settings
                    </Button>
                  ),
                },
                {
                  key: 3,
                  label: (
                    <Button
                      type="text"
                      icon={<TbPasswordFingerprint />}
                      style={dropDownStyle}
                    >
                      Change password
                    </Button>
                  ),
                },
                {
                  key: 4,
                  label: (
                    <Button
                      type="text"
                      onClick={() => {
                        console.log("hit from component");
                        // handleLogout()
                      }}
                      style={dropDownStyle}
                    >
                      Logout
                    </Button>
                  ),
                },
              ],
            }}
            placement="bottomRight"
            arrow
            trigger={["click"]}
          >
            <Button icon={<FaChevronDown />} />
          </Dropdown>
        </Header>

        {/* <Content style={{ margin: "1rem", overflow: "auto" }}>{router}</Content> */}
        <Content style={{ margin: "1rem", overflow: "auto" }}>router</Content>
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default Homepage;
