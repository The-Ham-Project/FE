import { useNavigate } from "react-router-dom";

function Mypage() {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useQuery({
      queryKey: ["getMyPage"],
      queryFn: () => getMyPage(),
    });
    const createdAt = new Date(data?.data.createdAt);
    const daysDifference = checkDate(createdAt);
  
    if (isLoading) {
      return <div>로딩 중...</div>;
    }
    if (isError) {
      return (
        <div
          style={{
            display: "flex",
            flex: "colum",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          혹시 로그인을 안하셨나요?? 흐헤헤
          <br />
        </div>
      );
    }
  
  return (
    <>

    </>
  );
}

export default Mypage;
