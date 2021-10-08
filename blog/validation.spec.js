const {
  check_nickname,
  check_password,
  check_confirmpassword,
  check_userNickname,
} = require("./validation");

test("낙내암은 영어와 숫자로만 이루어져야 하며 최소 3자 이상이어야 한다.", () => {
  expect(check_nickname("peter11")).toEqual(true); 
  expect(check_nickname("peter.1")).toEqual(false);
  expect(check_nickname("peter**&")).toEqual(false);
});

test("패스워드는 닉네임값을 포함하면 안되고 최소 4자 이상이어야 한다.", () => {
  expect(check_password("01234", "peter11")).toEqual(true); 
  expect(check_password("peter", "peter123")).toEqual(false);
  expect(check_password("a12b", "a12b")).toEqual(false);
});

test("패스워드는 확인패스워드값과 정확히 일치해야 한다. ", () => {
  expect(check_confirmpassword("peter", "peter")).toEqual(true); 
  expect(check_confirmpassword("peter123", "peter00*")).toEqual(false);
});

test("닉네임이 기존에 가입된 회원과 중복된 닉네임일 경우 에러메세지 발송.", () => {
  expect(check_userNickname("durant")).toEqual(true); 
  expect(check_userNickname("jordan")).toEqual(false);
  expect(check_userNickname("messi")).toEqual(false);
});
