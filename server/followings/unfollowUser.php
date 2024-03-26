<?PHP
 
 include("../db/connection.php");

$follower=$_GET['follower'];
$following=$_GET['following'];

$query = $mysqli->prepare('delete from followers where follower=? and following = ?');
    $query->bind_param('ii', $follower, $following);
    $query->execute();
    $query->store_result();
    
        $response['status']='success';
        

    echo json_encode($response);