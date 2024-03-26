<?PHP
 
 include("../db/connection.php");

$follower=$_POST['follower'];
$following=$_POST['following'];

$query = $mysqli->prepare('insert into followers(follower,following) values(?,?)');
    $query->bind_param('ii', $follower, $following);
    $query->execute();
    $query->store_result();
    
        $response['status']='success';
        

    echo json_encode($response);