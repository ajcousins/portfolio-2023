import { scaleTranslate } from './helpers';

export const menuObjects: MenuObj[] = [
  {
    text: 'PORTFOLIO',
    scale: 1.7, //pixels
    heightPercent: 0.65, // percent of window height
    xCentre: 26, // percent of window width
    yBottom: 85, // percent of window height
    path: 'M0.275568 27V0.818181H10.6051C12.5909 0.818181 14.2827 1.19744 15.6804 1.95597C17.0781 2.70597 18.1435 3.75 18.8764 5.08807C19.6179 6.41761 19.9886 7.9517 19.9886 9.69034C19.9886 11.429 19.6136 12.9631 18.8636 14.2926C18.1136 15.6222 17.027 16.6577 15.6037 17.3991C14.1889 18.1406 12.4759 18.5114 10.4645 18.5114H3.88068V14.0753H9.5696C10.6349 14.0753 11.5128 13.892 12.2031 13.5256C12.902 13.1506 13.4219 12.6349 13.7628 11.9787C14.1122 11.3139 14.2869 10.5511 14.2869 9.69034C14.2869 8.82102 14.1122 8.0625 13.7628 7.41477C13.4219 6.75852 12.902 6.25142 12.2031 5.89347C11.5043 5.52699 10.6179 5.34375 9.54403 5.34375H5.81108V27H0.275568ZM47.6438 13.9091C47.6438 16.7642 47.1026 19.1932 46.0202 21.196C44.9464 23.1989 43.4805 24.7287 41.6225 25.7855C39.7731 26.8338 37.6935 27.358 35.3839 27.358C33.0572 27.358 30.9691 26.8295 29.1197 25.7727C27.2702 24.7159 25.8086 23.1861 24.7347 21.1832C23.6609 19.1804 23.1239 16.7557 23.1239 13.9091C23.1239 11.054 23.6609 8.625 24.7347 6.62216C25.8086 4.61932 27.2702 3.09375 29.1197 2.04545C30.9691 0.988636 33.0572 0.460226 35.3839 0.460226C37.6935 0.460226 39.7731 0.988636 41.6225 2.04545C43.4805 3.09375 44.9464 4.61932 46.0202 6.62216C47.1026 8.625 47.6438 11.054 47.6438 13.9091ZM42.0316 13.9091C42.0316 12.0597 41.7546 10.5 41.2006 9.23011C40.6552 7.96023 39.8839 6.99716 38.8867 6.34091C37.8896 5.68466 36.7219 5.35653 35.3839 5.35653C34.0458 5.35653 32.8782 5.68466 31.881 6.34091C30.8839 6.99716 30.1083 7.96023 29.5543 9.23011C29.0089 10.5 28.7362 12.0597 28.7362 13.9091C28.7362 15.7585 29.0089 17.3182 29.5543 18.5881C30.1083 19.858 30.8839 20.821 31.881 21.4773C32.8782 22.1335 34.0458 22.4616 35.3839 22.4616C36.7219 22.4616 37.8896 22.1335 38.8867 21.4773C39.8839 20.821 40.6552 19.858 41.2006 18.5881C41.7546 17.3182 42.0316 15.7585 42.0316 13.9091ZM51.7443 27V0.818181H62.0739C64.0511 0.818181 65.7386 1.17187 67.1364 1.87926C68.5426 2.57812 69.6122 3.57102 70.3452 4.85795C71.0866 6.13636 71.4574 7.64062 71.4574 9.37074C71.4574 11.1094 71.0824 12.6051 70.3324 13.858C69.5824 15.1023 68.4957 16.0568 67.0724 16.7216C65.6577 17.3864 63.9446 17.7188 61.9332 17.7188H55.017V13.2699H61.0384C62.0952 13.2699 62.973 13.125 63.6719 12.8352C64.3707 12.5455 64.8906 12.1108 65.2315 11.5312C65.581 10.9517 65.7557 10.2315 65.7557 9.37074C65.7557 8.50142 65.581 7.76847 65.2315 7.17188C64.8906 6.57528 64.3665 6.12358 63.6591 5.81676C62.9602 5.50142 62.0781 5.34375 61.0128 5.34375H57.2798V27H51.7443ZM65.8835 15.0852L72.3906 27H66.2798L59.9134 15.0852H65.8835ZM74.3722 5.3821V0.818181H95.875V5.3821H87.8594V27H82.3878V5.3821H74.3722ZM99.4162 27V0.818181H116.751V5.3821H104.952V11.6207H115.601V16.1847H104.952V27H99.4162ZM144.534 13.9091C144.534 16.7642 143.993 19.1932 142.911 21.196C141.837 23.1989 140.371 24.7287 138.513 25.7855C136.664 26.8338 134.584 27.358 132.275 27.358C129.948 27.358 127.86 26.8295 126.01 25.7727C124.161 24.7159 122.699 23.1861 121.625 21.1832C120.551 19.1804 120.015 16.7557 120.015 13.9091C120.015 11.054 120.551 8.625 121.625 6.62216C122.699 4.61932 124.161 3.09375 126.01 2.04545C127.86 0.988636 129.948 0.460226 132.275 0.460226C134.584 0.460226 136.664 0.988636 138.513 2.04545C140.371 3.09375 141.837 4.61932 142.911 6.62216C143.993 8.625 144.534 11.054 144.534 13.9091ZM138.922 13.9091C138.922 12.0597 138.645 10.5 138.091 9.23011C137.546 7.96023 136.775 6.99716 135.777 6.34091C134.78 5.68466 133.613 5.35653 132.275 5.35653C130.936 5.35653 129.769 5.68466 128.772 6.34091C127.775 6.99716 126.999 7.96023 126.445 9.23011C125.9 10.5 125.627 12.0597 125.627 13.9091C125.627 15.7585 125.9 17.3182 126.445 18.5881C126.999 19.858 127.775 20.821 128.772 21.4773C129.769 22.1335 130.936 22.4616 132.275 22.4616C133.613 22.4616 134.78 22.1335 135.777 21.4773C136.775 20.821 137.546 19.858 138.091 18.5881C138.645 17.3182 138.922 15.7585 138.922 13.9091ZM148.635 27V0.818181H154.17V22.4361H165.395V27H148.635ZM174.596 0.818181V27H169.061V0.818181H174.596ZM203.21 13.9091C203.21 16.7642 202.669 19.1932 201.587 21.196C200.513 23.1989 199.047 24.7287 197.189 25.7855C195.339 26.8338 193.26 27.358 190.95 27.358C188.624 27.358 186.536 26.8295 184.686 25.7727C182.837 24.7159 181.375 23.1861 180.301 21.1832C179.227 19.1804 178.69 16.7557 178.69 13.9091C178.69 11.054 179.227 8.625 180.301 6.62216C181.375 4.61932 182.837 3.09375 184.686 2.04545C186.536 0.988636 188.624 0.460226 190.95 0.460226C193.26 0.460226 195.339 0.988636 197.189 2.04545C199.047 3.09375 200.513 4.61932 201.587 6.62216C202.669 8.625 203.21 11.054 203.21 13.9091ZM197.598 13.9091C197.598 12.0597 197.321 10.5 196.767 9.23011C196.222 7.96023 195.45 6.99716 194.453 6.34091C193.456 5.68466 192.288 5.35653 190.95 5.35653C189.612 5.35653 188.445 5.68466 187.447 6.34091C186.45 6.99716 185.675 7.96023 185.121 9.23011C184.575 10.5 184.303 12.0597 184.303 13.9091C184.303 15.7585 184.575 17.3182 185.121 18.5881C185.675 19.858 186.45 20.821 187.447 21.4773C188.445 22.1335 189.612 22.4616 190.95 22.4616C192.288 22.4616 193.456 22.1335 194.453 21.4773C195.45 20.821 196.222 19.858 196.767 18.5881C197.321 17.3182 197.598 15.7585 197.598 13.9091Z',
  },
  {
    text: 'ABOUT',
    scale: 1,
    heightPercent: 0.22,
    xCentre: 59,
    yBottom: 61,
    path: 'M6.78835 27H0.856534L9.89489 0.818181H17.0284L26.054 27H20.1222L13.5639 6.80114H13.3594L6.78835 27ZM6.41761 16.7088H20.429V21.0298H6.41761V16.7088ZM29.2053 27V0.818181H39.6882C41.6143 0.818181 43.2209 1.10369 44.5078 1.67472C45.7947 2.24574 46.7621 3.03835 47.4098 4.05256C48.0575 5.05824 48.3814 6.21733 48.3814 7.52983C48.3814 8.55256 48.1768 9.4517 47.7678 10.2273C47.3587 10.9943 46.7962 11.625 46.0803 12.1193C45.3729 12.6051 44.5632 12.9503 43.6513 13.1548V13.4105C44.6484 13.4531 45.5817 13.7344 46.451 14.2543C47.3288 14.7741 48.0405 15.5028 48.5859 16.4403C49.1314 17.3693 49.4041 18.4773 49.4041 19.7642C49.4041 21.1534 49.0589 22.3935 48.3686 23.4844C47.6868 24.5668 46.6768 25.4233 45.3388 26.054C44.0007 26.6847 42.3516 27 40.3913 27H29.2053ZM34.7408 22.4744H39.2536C40.7962 22.4744 41.9212 22.1804 42.6286 21.5923C43.3359 20.9957 43.6896 20.2031 43.6896 19.2145C43.6896 18.4901 43.5149 17.8509 43.1655 17.2969C42.8161 16.7429 42.3175 16.3082 41.6697 15.9929C41.0305 15.6776 40.2678 15.5199 39.3814 15.5199H34.7408V22.4744ZM34.7408 11.7741H38.8445C39.603 11.7741 40.2763 11.642 40.8643 11.3778C41.4609 11.1051 41.9297 10.7216 42.2706 10.2273C42.62 9.73295 42.7947 9.14062 42.7947 8.45028C42.7947 7.50426 42.4581 6.74148 41.7848 6.16193C41.12 5.58239 40.174 5.29261 38.9467 5.29261H34.7408V11.7741ZM77.0657 13.9091C77.0657 16.7642 76.5245 19.1932 75.4421 21.196C74.3683 23.1989 72.9023 24.7287 71.0444 25.7855C69.195 26.8338 67.1154 27.358 64.8058 27.358C62.479 27.358 60.391 26.8295 58.5415 25.7727C56.6921 24.7159 55.2305 23.1861 54.1566 21.1832C53.0827 19.1804 52.5458 16.7557 52.5458 13.9091C52.5458 11.054 53.0827 8.625 54.1566 6.62216C55.2305 4.61932 56.6921 3.09375 58.5415 2.04545C60.391 0.988636 62.479 0.460226 64.8058 0.460226C67.1154 0.460226 69.195 0.988636 71.0444 2.04545C72.9023 3.09375 74.3683 4.61932 75.4421 6.62216C76.5245 8.625 77.0657 11.054 77.0657 13.9091ZM71.4535 13.9091C71.4535 12.0597 71.1765 10.5 70.6225 9.23011C70.0771 7.96023 69.3058 6.99716 68.3086 6.34091C67.3114 5.68466 66.1438 5.35653 64.8058 5.35653C63.4677 5.35653 62.3001 5.68466 61.3029 6.34091C60.3058 6.99716 59.5302 7.96023 58.9762 9.23011C58.4308 10.5 58.158 12.0597 58.158 13.9091C58.158 15.7585 58.4308 17.3182 58.9762 18.5881C59.5302 19.858 60.3058 20.821 61.3029 21.4773C62.3001 22.1335 63.4677 22.4616 64.8058 22.4616C66.1438 22.4616 67.3114 22.1335 68.3086 21.4773C69.3058 20.821 70.0771 19.858 70.6225 18.5881C71.1765 17.3182 71.4535 15.7585 71.4535 13.9091ZM97.3381 0.818181H102.874V17.821C102.874 19.7301 102.418 21.4006 101.506 22.8324C100.602 24.2642 99.3366 25.3807 97.7088 26.1818C96.081 26.9744 94.1847 27.3707 92.0199 27.3707C89.8466 27.3707 87.946 26.9744 86.3182 26.1818C84.6903 25.3807 83.4247 24.2642 82.5213 22.8324C81.6179 21.4006 81.1662 19.7301 81.1662 17.821V0.818181H86.7017V17.348C86.7017 18.3452 86.919 19.2315 87.3537 20.0071C87.7969 20.7827 88.419 21.392 89.2202 21.8352C90.0213 22.2784 90.9545 22.5 92.0199 22.5C93.0938 22.5 94.027 22.2784 94.8196 21.8352C95.6207 21.392 96.2386 20.7827 96.6733 20.0071C97.1165 19.2315 97.3381 18.3452 97.3381 17.348V0.818181ZM106.431 5.3821V0.818181H127.934V5.3821H119.918V27H114.446V5.3821H106.431Z',
  },
  {
    text: 'CONTACT',
    scale: 1.35,
    heightPercent: 0.43,
    xCentre: 67,
    yBottom: 73,
    path: 'M24.3764 9.98438H18.777C18.6747 9.25994 18.4659 8.61648 18.1506 8.05398C17.8352 7.48295 17.4304 6.99716 16.9361 6.59659C16.4418 6.19602 15.8707 5.8892 15.223 5.67614C14.5838 5.46307 13.8892 5.35653 13.1392 5.35653C11.7841 5.35653 10.6037 5.69318 9.59801 6.36648C8.59233 7.03125 7.8125 8.00284 7.25852 9.28125C6.70455 10.5511 6.42756 12.0937 6.42756 13.9091C6.42756 15.7756 6.70455 17.3437 7.25852 18.6136C7.82102 19.8835 8.60511 20.8423 9.6108 21.4901C10.6165 22.1378 11.7798 22.4616 13.1009 22.4616C13.8423 22.4616 14.5284 22.3636 15.1591 22.1676C15.7983 21.9716 16.3651 21.6861 16.8594 21.3111C17.3537 20.9276 17.7628 20.4631 18.0866 19.9176C18.419 19.3722 18.6491 18.75 18.777 18.0511L24.3764 18.0767C24.2315 19.2784 23.8693 20.4375 23.2898 21.554C22.7188 22.6619 21.9474 23.6548 20.9759 24.5327C20.0128 25.402 18.8622 26.0923 17.5241 26.6037C16.1946 27.1065 14.6903 27.358 13.0114 27.358C10.6761 27.358 8.58807 26.8295 6.74716 25.7727C4.91477 24.7159 3.46591 23.1861 2.40057 21.1832C1.34375 19.1804 0.815341 16.7557 0.815341 13.9091C0.815341 11.054 1.35227 8.625 2.42614 6.62216C3.5 4.61932 4.95739 3.09375 6.7983 2.04545C8.6392 0.988636 10.7102 0.460226 13.0114 0.460226C14.5284 0.460226 15.9347 0.673295 17.2301 1.09943C18.5341 1.52557 19.6889 2.14773 20.6946 2.96591C21.7003 3.77557 22.5185 4.76846 23.1491 5.9446C23.7884 7.12074 24.1974 8.46733 24.3764 9.98438ZM52.4055 13.9091C52.4055 16.7642 51.8643 19.1932 50.782 21.196C49.7081 23.1989 48.2422 24.7287 46.3842 25.7855C44.5348 26.8338 42.4553 27.358 40.1456 27.358C37.8189 27.358 35.7308 26.8295 33.8814 25.7727C32.032 24.7159 30.5703 23.1861 29.4964 21.1832C28.4226 19.1804 27.8857 16.7557 27.8857 13.9091C27.8857 11.054 28.4226 8.625 29.4964 6.62216C30.5703 4.61932 32.032 3.09375 33.8814 2.04545C35.7308 0.988636 37.8189 0.460226 40.1456 0.460226C42.4553 0.460226 44.5348 0.988636 46.3842 2.04545C48.2422 3.09375 49.7081 4.61932 50.782 6.62216C51.8643 8.625 52.4055 11.054 52.4055 13.9091ZM46.7933 13.9091C46.7933 12.0597 46.5163 10.5 45.9624 9.23011C45.4169 7.96023 44.6456 6.99716 43.6484 6.34091C42.6513 5.68466 41.4837 5.35653 40.1456 5.35653C38.8075 5.35653 37.6399 5.68466 36.6428 6.34091C35.6456 6.99716 34.87 7.96023 34.3161 9.23011C33.7706 10.5 33.4979 12.0597 33.4979 13.9091C33.4979 15.7585 33.7706 17.3182 34.3161 18.5881C34.87 19.858 35.6456 20.821 36.6428 21.4773C37.6399 22.1335 38.8075 22.4616 40.1456 22.4616C41.4837 22.4616 42.6513 22.1335 43.6484 21.4773C44.6456 20.821 45.4169 19.858 45.9624 18.5881C46.5163 17.3182 46.7933 15.7585 46.7933 13.9091ZM78.4052 0.818181V27H73.6239L62.2333 10.5213H62.0415V27H56.506V0.818181H61.364L72.6651 17.2841H72.8952V0.818181H78.4052ZM81.9815 5.3821V0.818181H103.484V5.3821H95.4688V27H89.9972V5.3821H81.9815ZM108.339 27H102.407L111.446 0.818181H118.579L127.605 27H121.673L115.115 6.80114H114.91L108.339 27ZM107.968 16.7088H121.98V21.0298H107.968V16.7088ZM152.626 9.98438H147.027C146.925 9.25994 146.716 8.61648 146.401 8.05398C146.085 7.48295 145.68 6.99716 145.186 6.59659C144.692 6.19602 144.121 5.8892 143.473 5.67614C142.834 5.46307 142.139 5.35653 141.389 5.35653C140.034 5.35653 138.854 5.69318 137.848 6.36648C136.842 7.03125 136.063 8.00284 135.509 9.28125C134.955 10.5511 134.678 12.0937 134.678 13.9091C134.678 15.7756 134.955 17.3437 135.509 18.6136C136.071 19.8835 136.855 20.8423 137.861 21.4901C138.866 22.1378 140.03 22.4616 141.351 22.4616C142.092 22.4616 142.778 22.3636 143.409 22.1676C144.048 21.9716 144.615 21.6861 145.109 21.3111C145.604 20.9276 146.013 20.4631 146.337 19.9176C146.669 19.3722 146.899 18.75 147.027 18.0511L152.626 18.0767C152.482 19.2784 152.119 20.4375 151.54 21.554C150.969 22.6619 150.197 23.6548 149.226 24.5327C148.263 25.402 147.112 26.0923 145.774 26.6037C144.445 27.1065 142.94 27.358 141.261 27.358C138.926 27.358 136.838 26.8295 134.997 25.7727C133.165 24.7159 131.716 23.1861 130.651 21.1832C129.594 19.1804 129.065 16.7557 129.065 13.9091C129.065 11.054 129.602 8.625 130.676 6.62216C131.75 4.61932 133.207 3.09375 135.048 2.04545C136.889 0.988636 138.96 0.460226 141.261 0.460226C142.778 0.460226 144.185 0.673295 145.48 1.09943C146.784 1.52557 147.939 2.14773 148.945 2.96591C149.95 3.77557 150.768 4.76846 151.399 5.9446C152.038 7.12074 152.447 8.46733 152.626 9.98438ZM155.599 5.3821V0.818181H177.102V5.3821H169.086V27H163.614V5.3821H155.599Z',
  },
];

export const xTranslationMax: number = 100;