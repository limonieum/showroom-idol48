import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Card } from "reactstrap";
import { TOTAL_RANK } from "utils/api/api";
import formatViews from "utils/formatViews";
import { getSession } from "utils/getSession";

export default function SummaryRank({ roomId }) {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    try {
      axios
        .get(TOTAL_RANK(roomId, getSession()?.session?.cookie_login_id))
        .then((res) => {
          const totalRank = res.data;
          setSummary(totalRank);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return summary ? (
    <Table dark>
      <div className="scroll-room">
        <thead
          style={{
            backgroundColor: "#24a2b7",
            color: "white",
            borderTop: "none",
          }}
        >
          <tr>
            <th>Rank</th>
            <th>Ava</th>
            <th>Username</th>
            <th>Points</th>
            <th>Visit</th>
          </tr>
        </thead>
        {summary &&
          summary.map((item, idx) => (
            <tbody key={idx}>
              <tr>
                <th className="text-center">{item.rank}</th>
                <td>
                  <img width="40" src={item.avatar_url} />
                </td>
                <td style={{ wordBreak: "break-word" }}>{item.name}</td>
                <td>{formatViews(item.point)}</td>
                <td>{item.visit_count}x</td>
              </tr>
            </tbody>
          ))}
      </div>
    </Table>
  ) : (
    <Card body inverse color="dark" className="mb-3">
      <h5 className="text-gray-200">
        <img
          width="30"
          className="mr-2"
          src="https://image.showroom-cdn.com/showroom-prod/image/avatar/1028686.png?v=87"
          alt="Minzoid"
        />
        Minzoid
      </h5>
      <p>Tunggu wots</p>
    </Card>
  );
}
