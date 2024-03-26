<?php



include("../db/connection.php");



$query = $mysqli->prepare('select *
from users');

$query->execute();
$query->store_result();

$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = "failed";
} else {
    $users=[];
    $query->bind_result($id, $name,$email,$hashed_password,$image,$role,$position,$location,$followers,$bio,$cover);
    while($query->fetch()){
        $user=[
            'id'=>$id,
            'name'=>$name,
            'email'=>$email,
            'image'=>$image,
            'role'=>$role,
            'position'=>$position,
            'followers'=>$followers,
            'bio'=>$bio,
            'cover'=>$cover,
            'location'=>$location
    
        ]; 
        $users[]=$user;
   }
       
        $response['status'] = "success";
        $response['users']= $users;
   
}
echo json_encode($response);