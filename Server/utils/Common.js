

const randomString=(length)=>{
  let result="";
  let characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let characterLength=characters.length;

  for(let i=0;i<length;i++){
    result+=characters.charAt(Math.floor(Math.random()*characterLength));
  }

  return result;
}

module.exports={
  randomString
}