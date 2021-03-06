import {Component, OnInit, HostListener} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  installPwaLater: any;
  isVisible$ = new BehaviorSubject(false)
  headerColor!: string;
  zone!: string;
  file = 'iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAAXNSR0IArs4c6QAAHnhJREFUeF7tnQl8VNX1x39vmT2ZLCQkAcIaZA1bRGQTVBRBARfAtS7F/e9Sta21f7VWbbX+bdVWq1a0drGKUJFFRBBBEJAt7GsCZCP7OpnJrO+9/+fclwkJhGRChkDevPv5vM+bZN567nfOPffcc8/loBddAu2QANeOc/VTdQlAB0iHoF0S0AFql/j0k3WAdAbaJQEdoHaJTz9ZB0hnoF0S0AFql/j0k9sGkKJwcxYeMHj6xomcxyD4RZ6L12XYqSVQCcAQkBXF7JfMx6oCC+cM9oPjlFBfqk0AzdhemCD6+JkAbuA4Lp3jEAvoroBQhX2BHqcoCqoBZY/CKYsDorJs2cXdykN91pABmrm+ZJhgwC94KJeB47oAMAMQQr2RftwFLQEJgAeKUiEDGyQ/99rSy5L2hPLErQOkKNyMHUVdRD//hqJgap2MLnUBmffJCuRQ7qAfc8FLgAdg5DlYRV62CKjkOW5lQJSeWJaRUtFac9YqQHM+32/09uhyh6wov6kJoIerHh5JAUJuKC94EUb2AxIEAqdCZBN5OUZEAYAXLCcqP1k4d4ivJem0CtCM7YVWePkFVX758hq/bPPr1GiaNgMHxIi8K9bEf8cZ5VuWXdytrl0AzfyhLNqNwN4St9zDpyi6zaNpfNSXM3Kc1NXMF7g5MX3jhMTadgE0ZkWWXTHb8pySHCPr2icC8AF4DogS+BrO4+q5ZXp/R7sASluRZTcbrPmSoth1fiKCH+aXETjO4fHXpWaHAyBRtOYDir1V8ZGKUmRACVrYtG8OO66R9yj4+ZQ9V2+eBfet3lw/IGwSoDqTJEcA/o4DSAkEoJSWQykpAyoqodTUQHG6AI8XCATULpvAA4IAGAxs44xGwEybCZzJDFjMgNUCjm1WwGYBZzYDogjoIIWNjxYvJElQqmsgHzjsUARvavYLd7S/CWtWAykKFI8HSmExlNwCKEUlAP3tDxC96iYHtVEjLUQgnLpRo0v/4/mGPUefaSPgzCbAZgXHNhtAW7QNXBR9toIjIHXA2geY3w+lrBzykaNQcvOhuNwOziunZn/9QpgBkmUoVdWQ6Sb5hQBpmjo30zQcJ4ATRPC8CI4XAPqbVWw9IKw5Uzfyn1PzptQ3eU33Evu/QgDS8QSSKACCCI72pJEa9iJgNoOzWRhYKmRWIAiXyaSer5dmJaB4vFAKi6Dk5EEpLoVS6wTn8UEQzQ7J5wsjQIpsVyqrIOcVQDlRBKWsAnC6wCs8eMEAjjYGDg+OI02ibsySaawd6m0ihcAI2kcEUsPfJ+FSQSMtVg8T7dlnFTD2f9oHm0VjfbNoNAAmI2A0giPtZbGAs1gAKzWRVtZEUnPJmsdI1Fwkb0et2nrQVl4BpaoGnNcPQTSBE03gRaPDJyqp2Z881n4NJPiQr+QV2JX8AigFxUCti2kbXjQyeGgDwXNOKiMIFMGiGuknoaLvpPr/0XcSFLkRdPQdaR+CiewsAqbRnjQX014WE2Ci703sb3YM2Wda0lwEjdcHVFaxporZq7RVVYOXqbEwqvVJ8Agi/eodHs4XBoBeWGHneF++kn08GtUOjlM49SYqpaq2Oc+FAUVNKwMoCBh9bqypgvA12pN6ZNqIjHYCibSUujHYqPlrrNUIKjL+yeaiJvSc/GDCKEwGjZf94BWHA0plNVBSqtqrLrfaYpACCNYnA6ehhAmgaS/YFU7K53nBzotmCEYLeMF44QuvXg5BW4ppKgKq8ca0V70txppQ1ehnzSnBQZqIGe3UI6w34ql3SJDRd0GQSPDMRlM3ZqfR52CnIIxMtHgptfutQuP2QnG7mYZhtk1xCUDNlMIx+5QXDeANZvCCSbVXTy/hA4gThXzRHG0XRALn/GuccNVHg6EuByAzsAL1gKl7ZsCzDmQQsvrPtCOXBGmuKNVwVzWXumd/03ekwYKaKtirZL1NTm3umZ3YuFdaby821mzN2I8MeupgkN+NnluS1V4v9aRqnUBpOWSCpqQUqHODo+PIHuVFCASNkcAxtibGMAF0+5/tJtmQz3Fc647E1h6pE33P7C1ZgsygCkChX3bwc7BpbByP0OCpaOSyYPYXabF6wJjhTvZWvZ1Vb5vBYFS1mUEEDGpvkwFaDx2DjSlICQhIgM8Hxe0BXNQ0OdWecGU1qJNDwKi9XlXYzEYlaILaJvRmN3wAmRVjPoCIAqgp601jV4I9xobmUAkCRjaX2kwyzUBNotoNPdnkN3jY6//fsAt63oN3PlOgRKNnCbpF6pthteWlXrEJvEG1U5mdE9RybfsB6wC1TV5ncTSzl042ceoVTjZ7jXuNqnGv2lxNXBCN/WFB/1jjpvPUx+Ko+at3kbBmSag3hkXWe+K4eq89HdcY3La/ng5Q22V2Ds5o8HEF7ScVsCB6J8cK65u+ZscOT3muhmZI1WxBe6rBaRue19ABCo8cI/YqOkAtVb1B5HF5Rm9IkoydWSWorCHjUy+NJKAD1BIORoOAOVcMwsgByVi/Mw+b9uSjXIeosch0gFrTJ2ZRxsM3jUaPpDiszczDD7vzUFXrae20SPleB6ilmqaekL+uGgkxZjx222QkJcRh9bbj+G5HDpx1LU5E0AFqJIFWZ2Wk3f5nu1b9QOSv8bkq0aOrHQ/ffBl6pCRg+cZsfLv1WLBDztw45MgNSDKzl+RQeknaQEzXQKHUoyz5IbmrGUR3zRqHaRMHw+eXIElqFIBBFFBUUYtvtx3H2u05KChrcZJCKLfsLMfoAIVWUwpkvw+C4sYDN43B/bMngmdhHKq/hnwrfklmzdrKH4/ii3WHcCSvIrRLd+6jdIBCrj9Fgd3K4/7rM3DntaPOGNeUV1yD+Ut3YvH3h0O+dCc+UAeoLZXXM8mOe2eNxA2TBp7xNH9AwkfLduPDZTvh9gbacvnOeKwO0JlqjXxASfE2FJU7QZ9pS+seh9umDsVVl/RtsbL/sWIP3l+8A7Xa76lFNkAsAuKUKWmCwCM53oYxQ7qjd0oM5i/ZyQZDLxncHYP7JGDcsFQM7ZvYIkB/X76LAeTy6BqIBKXJbjzPc+jbPQ4xNhPrdvv9Ejy+AFxuP9J6xOPXd49HQqwVz763Fg6XF3OnDGEAxUaZYTUbzgiQLMv44MtMvP9lJvyUnkTbJXI1kMko4pk7x2P8sB7Mf1PpcCOroArfZ+bCWefFz28fi0G9E1Hn8TENJAo8664LND+thVJR7cTfvszEf1bt11Rk5hleOXIBMhtF/P6hyzF+WCrTKHUeP5ZuOIx1mbkYNTAF91w7AjSY2tayetMB/GvlPuzMruw0MeFtfcdGx0cuQBaTiL88dQ2G90+CURTw+aod2JNVgtFDe+OacQNA37e1UA/sq/V78eX6LBwqqGXNocZLZAJkt5kwfVwaHpl9MejzgaNF2LTrKLonxWFiRn9EWU2tG37NkEFeaWr+apxeFJQ5sWX/CXy3PQfHCqu0ylHkAdQ1zsbgmXPlYPRIjAYZ0w6nG7lFVbCajUhNiWMaKdRCWmfVpgOIibJgQJ8kxMfYIPA8vL4AKh0eZBVU4r9rD7JwELK1NFYiC6DUJDuuubQfZky4CH26Ufbhk8Xt9bMuvclIhnLoto/L7cW9z/+TzbwZnd6HNYFd46MZUEld7Kxnt/doKV7++wbkFzvYkIeGSuQAFIRn5sSL0DulKTztqdBalweTfvoWnC43eiTFoG/3LuibmoBxI/ph4qj+bMijtNqF+363nA2yakwLRQ5A08amYd6MERjQi9JXh6/U1nkx5aEPUUvTgGU/AgEvJozsi3tmjcWYYX3YjY4WVODO3y6B26cp7UOvFhkAkU1zz4zhuHfGSJjPonfVEm4utw9Tf/YfOJxeSAEf5IAX82ZdjIfmjGM9uYCk4EhuKe55aQk81CkLfdJe+Cg/d1eKDIC6JUThvlmjMPuKQWEXJYVwTH38EzjqfCw2iPigez10YwZzPJKRnZ1fgbtfWoY67Q2uRgZAlwzuhruvHY6JI3qGFSACpsbpwY2/WsQckeSxJj/13dcNx7yZI2AQVICy8itwz8vL2TEaK5EB0I2TB+L2qUNxUc/w2j8EA4190UyNQEBGQJbBcxzzLUVbKa0Nx3phu48U4tE/rdZieEdkAPTY3NGYe+VgxETR2i/hLzQYq05BV1O+qOkc1TEzciyu2ZqFl//xIzw+yuahqaJ9gGKjzfjl7WMxfXxam/w74armqlo3PvtmF+Yv38/iqDVWtA/QsH5d8T9zRmNceo/zUndlVS78ZcFGLN+cC39A78Y3WwkX8rSeWZcNwE+uSQ+7/0eWFWYgiyLfrGaj751uL/ZnF+Htz3/E/rxaSNpbB0L7GuiJW8ewoYvEWGtYNVB1bR32HjmBGqcbaT27onvXWFhMRlQ5XCgsrcaJsmqcKKnGoZxSbNpXDJdf1OLSV9oGiMa1Xn34Slw2oieLaQ5nOZpfhvcXrsfmnUcxISMNGYN7ISE2CsdPlGP7/lzszy5EUVkNZE6AwRILwUgGfKvBneF8xI64lrYB6ts9Fi/eN5nF/IS7kHf5rU/WYtXGAyzxJnW6bBYjM5R9zNahRJUiywImmKLAN5+kMtyP1dHX0zZA08b1w4PXZ7DY53CXoycq8f4X27Fux3G4nA74PC6Wto4SU7IstQZKHWc4R3mxw/02Z309bQP0xC1jMGNi+O0f1YGowOuXUOPy4Ln312Hn4SJ4PL76TKf1Szecdb10mhO1DdB7T09HxsAUUPxzuIvT7cPOI8X4bPV+ZB4qhouGMiInqUJQnNoEiLzAXeOsIICo+aLhhcbF5w+wnhKFsNKAZ1tKICCBQjhKK2ux40AeXvv4O/g5q7qUg7ZG2kMRizYBoik4NF3n2XsmIrlLVBNBUEBXbmE53l3wPZ65bxriom0srDXUQvBt2XMc//12J4oqXNidXQbRZKvP5B76dUK93wV+nDYBoi77fbNG4pYpQ0BDGY1LlaMO32zcj9c//hZfvPUAuifGgmajhlLIcUi+nwUrt2PFDwcQUAQI5pgzLQMQyiU7+zHaBIgCuf702NXIGJRy2vSc7LxSvP3pemzYnY8Ff7gDvbvFQ6Q1K0IopH227s3Bom/3YOOefLg8EgSTLYQzNXuI9gAiM8RuM2PByzey5qvxTFLKHrZ1Xy6e++vXcPiNmP/MdAzs3RVGWj4gxEJaKPNwMT5dtR8/7itgxnMEF+0BRMDQsMXrj16OrnFRbKoOTWMmY5mar+Ub9uO1f/4AW3QsXnt4Esak92pxrntzcJAddTCnHO8vzmRzvyjmJ0KL9gBSK1KBKVCNMek9kTGkFwb0TkaPrrE4nFOMvy/dhj25tbCYLXh8zgjMmjQU9rOIE6KB0dyiavzu4x9Yd16DI+2h/Ca0CZAiBeCtLYbA0ZJcPEtHR115GgyXYABviWNjYzdO7I0HZ49DQuzZ2TGkiU6U1eLpd9YgK79Si/E+rUGkTYAoMlCWfJD9XnUv+euHGQwQzdEQjFZmGw3vG4NXHpmGbolnv8gQaR5qzn7/8Q84kl/JQjwiqGgUINaKqSveBFe9UcNNebZiNK1kQx4bu1nGxy/MRb8e8e0as6IB1LWZuZi/JJNBRMMcEVI0DFAoNSh58M4vrsPoIamwmFtdna/FK1ISqsXfH8IXaw/hWGF1KHfXwjGRDRA1bT+bOwqzJqez+eztLWQPfbpqH77efBSlVa72Xq4znB/ZANHg59SMZDw8dzz6pTaf95CybOw8mAeb1YTU5DiWNKGlpct3Z5Xg09X7sXZHjhbngZ0KdWQDRNLonWjAiw9NxcgB3U/7xQckCbmFlZi/aAPLo0gugREDUtE9KRY2Wke+mULde4LnX1/vwa6sEq3bQzpAguLBG09eh4kj+7A8iMFC2snj9WPr3uPYcbAAS77bBWedGxNHpWHm5SMwfEAqYu2WZgPqKb3v15uzWa7EkkpNN2U6QJQM4bmfTmRp7WKjmwbeq3PdOfzl8x+xaPVOFBWVQpb9LIB+xqR03DFjLBLjopodjC0odbBs9R8t26W1lC6N9a4OEHXzfzp9MGZfmY6eKfHNNksv/O1brNmexzK5Sr46KP46mA0cBvdLxhN3XsUC6k8d0acm73BuBd5etI1lJ9No0QGiip12SSruum4khvRLabaeH3t9GbYcKGHZNUgrKZTGxV8HQfEhJTEaN18zGjdOGYU4u61JTJnHG8C2g4V45PWVWl0CSgeIiBmVFo+HZ1/CBlZPLQTMT55fiP05VWiYWEoQyQFI5On2OZHSxcaykd08bTQu6p3UMIWIfJeUYPPul5ayLB4ajHjVASJgusUZ8YufTMCUMf2b8EP+ZLfHh9ueW4SjhY7T5nXRLAwpQBDVIdYq4L7ZE3DdpHQkJ8Q0XCe/xIFH/7QSxwurtdgj0wGimjbxEp6+awKunzykSYw02TFFpdW479WvkF/ibDbmmTVpko/ZRndMG4Fbp2U08SnRYi3Pf7AO2w4WsdUMNVZ0gKhCE6KNeGTuaEwffxGbnhwskixjz5ET+NW736OwvOXuuCwFcPvVg3HL1cPQt8fJPETkkX7zs62sW6+xBJskJh0gmv48eWRP3HrVUAzrn9REA9EMjJUbD+KNhZkorWp9zfjbrh6Cm6cMaTKRkXpuH3+1B5+s3Auf9kbqIxsgip0e0jcRU8f0w8QRqUhJiG6YAkTap7zKifc+34hvdhSi1t161OHsywfgtqnp6J96UgPRIOuS9Ufw1oItbCKixkrkAkR+m9GDUtjUn/LqOtitBpbn2WIysC53eaUTn369DfMXb4VitIc08yLjogQ8eONojBnas6E7T+tlrN+Vh+f/tk6Loa+RCxDNVv3dg5MxfnhPNnOV4oOC88No0uGnK7bio8WbIAtWCKZocCFkr+clN568fRxmTxneMFbm9UksU/3D/7dCz5F4JvV7ISeYau6ZKZx1YK8E/PnJqxFntzSZuXq8oByLVu3A56syUesBRLMdHJv20/qkQcnvxpSMVNw142LmnabCwl5LHZj77BdaHJ2PTA2UEGPFAzeMwk2XD2xiNB/JKcEX3+7E8vX7UO7ws/BXimAMBR6ChfxC8VYZ82Zm4LZrL2HXpm4+2UF3/OZLfakDLWgg0j5D+iTiD49cydZGDcb2HDpehMVrduGbTYdQXOmBYI5iqVraWmicbPrYvph3/RgM6JPMTqdpP69/shkrNmej1uVr6yUv5OMjTwPRZMObJg/EAzdmNDRKh44V4Ys1O7F682EUVXkhGG3gxbbDQzVNUY69E8249ep03DJ9NAsRIQcijYm9MH89Cstq25zqjiA3GQTE2y2It5tZHmqbxcAMfvpB0D2CCwhT1pCVm492lM8psgAiQY8ckIyn7xjXkHSzuNyBfyzZhBUbDqCkxtcueJiqUBTwsgeTRnTHI7dcxsbGaAzM5fHhqbdWs1mtoUxEJEBojQ/qESbGWHHp0O7oGm8DrXdGdpvdaoTVYmAdAAMBxHNsWhFFAPzynTWggdwOKJEDEE3jIT/PdeP7s3UsqMdFsycWrNyGDxdvRkG5u/3w1NcYxRilxBpw/aQBmHfThAbv9sdf7Wb5hCh2urlCroX4aDMS46zo0y2OQUIhteReuHNaOpthe6ZCWq60yomvNhzGu0t2d9QctcgAiH6lSfE2TBrZEzddMQh9u8Ux47a0ohaPv7oAB/JqIPFmNcdPOArNS/PXYVBqFJ69/xqMGKiu0UEDqi/9fQNLSEWOSoKYtAw9n8UssiaK1qunpKC0LFWUxciWz6Rk5aR1aInyYCGtRske3F4f6tw+lh2WUgovWL0H2SV+NomyA4q2ASK7gHpCIy9KxtwrB7HFVshuoOL1+TH/vz/g3yt2wuE3nJXB3FIFkS1kN8m4anQv/PaRWQ321pufbcHKH4+iqtbDAOmTEov0tK7IGJiMUQPUbCJnCtqn5kyW1DU5vN4AjhaUsoywW3Yfx96sEyzgTTBYYLTFd1SyK20D1MVuwW1Th2Lqpf3QPTGaRQ2SN4d8M/nFlbjrmY9Q6TUBgqldEwubBYnFDPmQlmTEp6/Ng9lkYPemzPWlVXVsZmyXGCuirEb2mTa+/vmaux49c0mFA7sO5mPL3mPYti8HJeUOeP0BZqRLbN6kEaLFDsFwbtYEaea5tAlQMMXdU7deiosHdUOc3dwkYJ7GuP766VosWnsQshgV0jDF2TQH5BdKihHx2/uvwNjhfRnANGuDmi+CidZmpWaMYo6y8kpRUeVkBjZpR9o76zwsowg1tSdKq1haPQr0pyaL1niVFA6cYAQvmtS9IIDjhI7SPiQS7QFElZQUZ8NjN9P6GKmIiTI18TTXeXzYvi8Hv3pzCRwBM0vFe85yGyoKrCYOV45IwvMPXsu0ULDQSH9haQ227juOzbuP4XhBGRtspSZKCjZVkszsHDKkCRhasJe0DC8aGoABR9BQN54/d+9x5l+P9gDqEmPBvTNHghbXpebh1ASblGH+3QXrsXxjNlP3TPDnsPCQ0cXqx4sPTcOQtO4oq6rF0bwyHM4pwdG8UhwvrEBBcRVc3kD9s7C1otRE5bTnaC+wsThKXM5goaTlvArOeS7aA4hsnVcevgLD0pKaZCdj+tbpxpoth/Hax2vg8NEv+eychW2pNJbcwe/CuCFJ6JXSBZUOF/KLKpFXXIkqhwcKZbNnzU9QExI0dId6gNiep5HeCwGYU19dewBRet/H516MaeMGwCA2/YWS4bxw1S588OV2CDRI2hFpeVlz5IfkrlLTzLAlEEij0GZgGe0JIKZVOl/RHkAU1zNzXC/87PZJpzne8ooqsWjNXnz01T7WHHRcURDwOCEHfAwU0nykcdoyUNtxz9qmO2kPIJOBR3qvaLzzzE2n5T4srnBi6YbD+MvC7W2SUjgODmax7xCtF44HDu0a2gOIg4IYi4Jlb9zN1khtXGHkaKPg9lf/uSk08ehHtSYB7QFEI5cmUcb8X8/AoH4pMDVK4UtrvK/eegzPf/B9a4LRvw9NAhoEiDK0Gnj8/v6JmDCyH6yWkz0t8rOsy8zBz//8bWji0Y9qTQJaBAgwGwW88sAkjBtBOaBPAkRjSRt35+OxP37DxpP00m4JaBMgGpB8/dEpGD24W8PgaVBUWw8U4sk3V6HG5W239PQLaHAogyqVAHrrCco6lnzaWmG7jhTj2b+tQ25RjV7/7ZeAdjXQX38xHen9Ek/zBR04Xo7X/r0JOw4VtV98+hW0CpABHzxzLQb1TjhtteZjJ6rw3uJM1p3XS7sloE2ArGYDPvrfGejfM55F/DUuheVOfL5mPz5cuqvd0tMvoFEbiAD6129mok+3+NPGw6qdHny3PQcvfriBxeXopV0S0K4G+uylG5CaFNMkkIxERYH0ucU1bJWd7ZSzR4eoPQRpEyCb2YBFr9zEZmFQ1N+phaa/5BRX49fvrsWxE9WRtkBKe4A59VxtAkTd+D8+ejkuHpx6mh+IJEDhoruzivH0O9+xmBxyMOrlrCSgTYBEgcPEwXH45T1TWE7n4IAqmztV6cCmXcfw9caD2JZVAxmkoVpPnHBW4tX+SdoEiFYsNEoOXDdxEOJjrA14UEB7ZY0L+7ILcTi3HJw5Dnwbkidon4c2v6F2AfK7ayF5aqEop2QF43gW0EXzpwRTVMdEJba5XjrNCVoFSE214nfXsD1pJLWo4aQED29oGivUaarswnpQ7QJ0YclZs0+jA6TZqu2YF9MB6hg5a/YuOkCardqOebEwAiQb8sBxJxeJ6JgX0O9yPiWgKDUe3t8z+5PHaCGRM5ZWvWwDZn4YLVjq9vOCoRvlDDif76Tfu8MkIMmSv1ByW4ccXjqv+YxZDX3fVp5p2NU/t7kE81JzTPJYjhctHfYK+o3OmwQUOeD21JRssknuWXtWvd7iQiKtaqC0tGkmV5Ttqdj+Ex4RRHMyuVvO25vpNz73EqAFigKe4sqs9W9HO91/zM7+usUA81BgEAz25Izelz34nMHWZTzPG2J1iM59PZ6XO1DeLNlf7XeVb8xZ//6LfkdxJoAWFwEJBSAOtsSkaHvC2ORRc+aJ1vhRvCDGcmr6C90mOi81HfabSooc8MlSoDpQV5lZnLnww1pH+Wa4ykoaufqbvWkoANGJlK2grxiV0C2h77hJtm7pk432rhfxgiGaAxvy1ksnlYBCcXiSv9bnKD3iKty7rvzYpu8DzvJCYPIxYF2r+YRDBYjEEwWgu8FgiRHN0QZFtPFQ1zHRS2eXQAAKF3DJAU+t3++XawD7CaDMGcprtQUA0jSUizYWgB0AZXsMbaWSUJ5EP+Z8SYBGo8nO8VCeLgDVlOiWIoRDeaC2AETXo+OpOaOEgDo8oUi4cxwThMhPiW5bs3sav1JbAeoc4tCfssMkoAPUYaLW5o10gLRZrx32VjpAHSZqbd5IB0ib9dphb6UD1GGi1uaN/h/JYh2B+1wv9AAAAABJRU5ErkJggg=='

  // @HostListener('window:beforeinstallprompt', ['$event'])
  // onBeforeInstallPrompt(e: any) {

  //   console.log('beforeinstallprompt', e);
  //   // e.preventDefault();
  //   this.installPwaLater = e;
  //   this.isVisible$.next(true)
  // }

  // @HostListener('window:appinstalled', ['$event'])
  // onAppInstalled(e: any) {
  //   console.log('appinstalled HostListener', e);
  //   // e.preventDefault();
  //   this.installPwaLater = null;
  //   this.isVisible$.next(false)
  // }

  isServiceWorker = 'serviceWorker' in navigator

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    console.log(this.isServiceWorker)
    this.appService.polygon.subscribe(polygon => {
      this.headerColor = polygon.color;
      this.zone = polygon.name;
    })
    // this.updateManifest();

    // if (window.matchMedia('(display-mode: standalone)').matches) {
    //   console.log('display-mode is standalone');
    // }

    // window.addEventListener('appinstalled', (evt) => {
    //   console.log('a2hs installed');
    // });
  }

  async getInstalledApps() {
    const installedApps = await (navigator as any).getInstalledRelatedApps();
    console.log(installedApps);

  }

  updateManifest() {
    const currentLocation = window.location.origin;
    var myDynamicManifest = {
      "name": "Your Great Site",
      "short_name": "Your Great Site short name",
      "description": "Something dynamic",
      "start_url": `${currentLocation}/`,
      "background_color": "#000000",
      "theme_color": "#0f4a73",
      "display": "standalone",
      "icons": [
        {
          "src": this.getDataUrlForBase64(this.file, "image/png"),
          "sizes": "144x144",
          "type": "image/png"
        }
        ]
      }
      const link = document.createElement("link");
      link.rel = "manifest";
      const stringManifest = JSON.stringify(myDynamicManifest);
      link.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(stringManifest))
      document.head.appendChild(link);
    }

    getDataUrlForBase64(base64String: string, mimetype: string) {
      return `data:${mimetype};base64,${base64String}`;
    }

    async addToHomeScreen() {
      this.installPwaLater.prompt();
      const { outcome } = await this.installPwaLater.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      // this.isVisible$.next(false);
    }

}
