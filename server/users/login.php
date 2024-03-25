<?php



include("../db/connection.php");

$email = $_POST['email'];
$password = $_POST['password'];

$query = $mysqli->prepare('select *
from users
where email=?');
$query->bind_param('s', $email);
$query->execute();
$query->store_result();
$query->bind_result($id, $name,$email,$hashed_password,$image,$role,$position,$location,$followers,$bio,$cover);
$query->fetch();
$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = "user not found";
} else {
    if (password_verify($password, $hashed_password)) {
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
    } else {
        $response['status'] = "incorrect credentials";
    }
}
echo json_encode($response);