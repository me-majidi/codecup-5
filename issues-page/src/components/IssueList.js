import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Loading from "./Loading";
import IssueItem from "./IssueItem";
import { useEffect, useState } from "react";

function IssueList({ issues, fetchNext }) {
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [loading, setLoading] = useState(false);

  function fetchMoreListItems() {}

  useEffect(() => {
    if (isFetching === true && !loading) {
      setLoading(true);
      fetchNext().then(() => {
        setIsFetching(false);
        setLoading(false);
      });
    }
  }, [isFetching, fetchNext, setIsFetching, loading]);

  return (
    <>
      <div className="issues" data-testid="issues">
        {issues.map((issue, i) => (
          <IssueItem key={i} issue={issue} />
        ))}
      </div>
      {loading && <Loading />}
    </>
  );
}

export default IssueList;
