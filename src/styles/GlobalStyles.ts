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
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 16px;
	font-family: 'Pretendard-Regular';
	vertical-align: baseline;
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
    outline:none
	
}
input:checked {
    border: none
}
button {
    background: none;
    border:none;
    cursor: pointer;
    outline:none
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
        width: 50vh;
        height: 50px;
        background: #F5F5F5;
        border-radius: 20px;
        font-size: 16px;
        padding: 10px; /* Add padding for text inside the input */
    }

   /* Custom style for textarea */
   textarea {
	width: 50vh;
	height: 150px;
	background: #F5F5F5;
	border-radius: 24px;
	font-size: 16px;
	padding: 10px;
	resize: vertical;
	overflow-y: auto;
}
   html, body, #root {width:100%; height:100%;}

`;

export default GlobalStyle;
