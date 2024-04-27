import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 14px;
	/* font-family: 'Pretendard-Regular'; */
	vertical-align: baseline;
    font-family: Pretendard-Regular;
    font-style: normal;    
    box-sizing: border-box;


}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
input { 
    box-sizing: border-box;
    border: none;
    outline-color: rgba(22, 137, 243, 1);
    
    
	
}
input:checked {
    border: none
}
button {
	width: 100%;

height: 52px;
background-color: #1689f3;
border-radius: 31.14px;
color: white;
font-size: 16px;
font-family: 'Pretendard';
font-weight: 600;
text-align: center;
border: none;
cursor: pointer;

}
a {
	text-decoration: none;
	outline: none;
	&:hover, &:active {
		text-decoration: none;
	}
    color: #222;
}
input[type="text"] {
        width: 100%;
        height: 40px;
        background: #F5F5F5;
        border-radius: 6px;
        font-size: 16px;
        padding: 10px; /* Add padding for text inside the input */
        
        

    }
    input::placeholder {
    font-family: 'Pretendard-Regular'; /* placeholder 폰트 변경 */
    font-size: 14px; /* placeholder 폰트 크기 변경 */
    color: #878787; /* placeholder 색상 변경 */

}

input[type="text"]:focus {
    border-color: rgba(22, 137, 243, 1); /* Change border color on focus */
    outline: 1px solid rgba(22, 137, 243, 1); 
}
textarea::placeholder {
    font-family: 'Pretendard-Regular'; /* placeholder 폰트 변경 */
    font-size: 14px; /* placeholder 폰트 크기 변경 */
    color: #999; /* placeholder 색상 변경 */
    line-height: 1.5;
    width: 100%;

    @media screen and (max-width: 375px) {
        width: 280px;
}
}

textarea:focus {
    border-color: rgba(22, 137, 243, 1); /* Change border color on focus */
    outline: 1px solid rgba(22, 137, 243, 1); 
}
   /* Custom style for textarea */
   textarea {
    flex: 1;
    overflow: hidden;
    font-family: 'Pretendard-Regular';
    height: 190px;
      outline-color: rgba(22, 137, 243, 1);
	background: #F5F5F5;
    border-radius: 6px;
    font-size: 16px;
    border: none;
}

   html, body, #root {
    position: fixed;
    width:100%; height:100vh;
   margin: 0;
   }

`;

export default GlobalStyle;
