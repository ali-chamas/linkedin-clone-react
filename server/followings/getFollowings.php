<?PHP
 
 include("../db/connection.php");

$id=$_GET['id'];

$query = $mysqli->prepare('SELECT followers.following,users.name,users.image
 from followers
 JOIN users on followers.following=users.id
 WHERE followers.follower = ?
 GROUP BY followers.following
 ');
    $query->bind_param('i', $id);
    $query->execute();
    $query->store_result();
    $num_rows=$query->num_rows();
    if($num_rows==0){
        $response['status']='Failed';
        $response['message']= 'no followings available';
    }else{
        $followings = [];
        $query->bind_result($follower,$name,$image);
        while($query->fetch()){
            $following = [
                'id' => $id,
                'following'=>$follower,
                'name'=> $name,
                'image'=> $image,
                
                
                
               
            ];

            $followings[] = $following;
        }
        $response['status']='success';
        $response['followings']= $followings;
    }
    echo json_encode($response);