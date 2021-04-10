
export async function getAllTableData(){
 const res= await fetch('https://jsonplaceholder.typicode.com/users');
 const user = res.json();

 return user;

}