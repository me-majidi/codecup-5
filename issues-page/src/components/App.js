import OpenIssueIcon from "./OpenIssueIcon";
import CloseIssueIcon from "./CloseIssueIcon";
import IssueList from "./IssueList";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function App() {
  const [issues, setIssues] = useState([]);
  const [status, setStatus] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function changeStatus(s) {
    setStatus(() => s);
    setPage(() => 1);
    setIssues(() => []);

    setLoading(true);
    fetchNextPage(false).then(() => setLoading(false));
  }

  function fetchNextPage(change = true) {
    if (!page) {
      return Promise.resolve();
    }

    return fetch(
      `http://localhost:9000/issues?page=${page}&issuesFilter=${status}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (change) {
          if (res.length) {
            setPage((p) => p + 1);
          } else {
            setPage(null);
          }
        }
        setIssues((is) => [...is, ...res]);
        return Promise.resolve();
      });
  }

  useEffect(() => {
    fetch("http://localhost:9000/issues?page=1")
      .then((res) => res.json())
      .then((res) => {
        setIssues((is) => [...is, ...res]);
        setPage(2);
      });
  }, []);

  return (
    <div className="container">
      <div className="box">
        <div className="box-header">
          <div
            data-testid="open-issues"
            className="open-issues"
            onClick={() => changeStatus(1)}
          >
            <OpenIssueIcon /> Open
          </div>
          <div
            data-testid="close-issues"
            className="close-issues"
            onClick={() => changeStatus(2)}
          >
            <CloseIssueIcon /> Closed
          </div>
        </div>

        <IssueList issues={issues} fetchNext={fetchNextPage} page={page} />
        {loading && <Loading />}
      </div>
    </div>
  );
}

export default App;
