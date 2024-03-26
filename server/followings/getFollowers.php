<?PHP
 
 include("../db/connection.php");

$id=$_GET['id'];

$query = $mysqli->prepare('SELECT followers.follower,users.name,users.image
 from followers
 JOIN users on followers.follower=users.id
 WHERE following = ?
 GROUP BY followers.follower
 ');
    $query->bind_param('i', $id);
    $query->execute();
    $query->store_result();
    $num_rows=$query->num_rows();
    if($num_rows==0){
        $response['status']='Failed';
        $response['message']= 'no followers available';
    }else{
        $followers = [];
        $query->bind_result($follower,$name,$image);
        while($query->fetch()){
            $follower = [
                'id' => $id,
                'follower'=>$follower,
                'name'=> $name,
                'image'=> $image,
                
                
                
               
            ];

            $followers[] = $follower;
        }
        $response['status']='success';
        $response['followers']= $followers;
    }
    echo json_encode($response);