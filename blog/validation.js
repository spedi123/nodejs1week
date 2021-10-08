module.exports = {
    // 닉네임이 기존에 가입된 회원과 중복된 닉네임일 경우 에러메세지 발송.
    check_userNickname: (userNickname) => {
        const nickNames = [
            { userNickname: 'peter'},
            { userNickname: 'son'},
            { userNickname: 'jordan'},
            { userNickname: 'ali'},
            { userNickname: 'kane'},
            { userNickname: 'messi'},
            { userNickname: 'ronaldo'}
        ];
        // 닉네임값 중복일 경우
        for (let nickName of nickNames )
        if (nickName.userNickname === userNickname) {
            console.log('중복된 닉네임입니다.')
            return false;
        }
        return true;
    },
    // 낙내암은 영어와 숫자로만 이루어져야 하며 최소 3자 이상이어야 한다. 
    check_nickname: (userNickname) => {
        if( userNickname.length <3 || !userNickname.match(/^[0-9A-Za-z]*$/)){
            return false
        }
        return true
    },
    // 패스워드는 닉네임값을 포함하면 안되고 최소 4자 이상이어야 한다.
    check_password: (userNickname ,password)=>{
        if(password.length < 4 || password.includes(userNickname)){
            return false
        }
        return true
    },
    // 패스워드는 확인패스워드값과 정확히 일치해야 한다. 
    check_confirmpassword: (password, confirmPassword) => {
        if(password === confirmPassword){
            return true
        }
        return false
    }
};