import axios from "axios";
import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("Rutvitrasau@123");
  const [datatable, setDatable] = useState([]);
  const today = new Date();

  const formattedToday = today.toISOString().split("T")[0] + "T23%3A59%3A59.00";
  const login = async () => {
    const url = "https://business.momo.vn/api/authentication/login?language=vi";
    const url_gettransaction =
      "/api/transaction/v2/transactions?pageSize=10&pageNumber=0&fromDate=2024-10-01T00%3A00%3A00.00&toDate=2024-10-15T23%3A59%3A59.00&dateId=YESTERDAY&status=ALL&merchantId=1961192&language=vi";
    const getmerchant =
      "https://cors-anywhere.herokuapp.com/https://business.momo.vn/api/profile/v2/merchants?requestType=LOGIN_MERCHANTS&language=vi";
    // Định nghĩa headers
    const headers = {
      Host: "business.momo.vn",
      Origin: "https://business.momo.vn",
      Referer: "https://business.momo.vn/portal/login?t=1728998430394",
      "sec-ch-ua":
        '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
      "x-api-request-id": "M4BWeb_1729001040462_0.40uk8g66zj6",
    };

    // Dữ liệu đăng nhập
    const data = {
      username: username,
      password: password,
    };

    try {
      // Gửi yêu cầu POST
      await axios
        .post("https://cors-anywhere.herokuapp.com/https://business.momo.vn/api/authentication/login?language=vi", data, {
          headers: headers,
        })
        .then((response) => {
          console.log(response.data.data);
          axios
            .get(getmerchant, {
              headers: {
                Authorization: "Bearer " + response.data.data.token,
              },
            })
            .then((result) => {
              console.log(result.data.data.merchantResponseList[0].id);
              axios
                .get(
                  `https://cors-anywhere.herokuapp.com/https://business.momo.vn/api/transaction/v2/transactions/statistics?pageSize=10&pageNumber=0&fromDate=2024-10-01T00%3A00%3A00.00&toDate=2024-10-15T23%3A59%3A59.00&dateId=THIS_MONTH&status=ALL&merchantId=${result.data.data.merchantResponseList[0].id}&language=vi`,
                  {
                    headers: {
                      Authorization: "Bearer " + response.data.data.token,
                    },
                  }
                )
                .then((result) => {
                  console.log(result.data.data.totalSuccessAmount);
                  setDatable(result.data.data.totalSuccessAmount);
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error))
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div>
      <h1>Login Form</h1>
      <label htmlFor="Username">Phone:</label>
      <select onChange={(e) => setUsername(e.target.value)}>
        <option value="0358227696">0358227696</option>
        <option value="0926237541">0926237541</option>
        <option value="0562877514">0562877514</option>
      </select>

      <button onClick={login}>Login</button>
      <table className="table table-hover">
        <thead>
          <th>ID</th>
          <th>createdDate</th>
          <th>customerName</th>
          <th>totalAmount</th>
          <th>statusDescription</th>
        </thead>
        <tbody>
          {/* {datatable.map((item,index) => (
            <tr key={index}>
            <td>{item.id}</td>
            <td>{item.createdDate}</td>
            <td>{item.customerName}</td>
            <td>{item.statusDescription}</td>
            <td>{item.totalAmount.toLocaleString('vi-VN')} đ</td>
            </tr>
          ))} */}
          <h1 className="text-danger">
            Tổng tiền: {datatable.toLocaleString("vi-VN")} đ
          </h1>
        </tbody>
      </table>
    </div>
  );
}

export default App;
