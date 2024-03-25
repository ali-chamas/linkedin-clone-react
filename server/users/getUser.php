<?php



include("../db/connection.php");

$id=$_GET['id'];

$query = $mysqli->prepare('select *
from users
where id=?');
$query->bind_param('i', $id);
$query->execute();
$query->store_result();
$query->bind_result($id, $name,$email,$hashed_password,$image,$role,$position,$location,$followers,$bio,$cover);
$query->fetch();
$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = "failed";
} else {
   
        $response['status'] = "success";
        $response['user']=[
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
   
}
echo json_encode($response);