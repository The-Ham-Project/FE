export default function Location(): JSX.Element {
  return (
    <>
        <script 
        type="text/javascript" 
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 넣으시면 됩니다."
        ></script>
        <div id='map' style={{ width:500, height: 400 }}>Location</div>
    </>
  )
}
