<?PHP
 
 include("../db/connection.php");

 $request_method = $_SERVER["REQUEST_METHOD"];

 switch ($request_method) {
    case "GET":
        if(!empty($_GET["iuserID"])){
            $id = intval($_GET["userID"]);
            $response = getUserPosts($id);
            echo json_encode($response);
        }else{
            $response = getAllPosts();
            echo json_encode($response);
        }
        break;
    case "POST":
        
            $description= $_POST["description"];
            $image= $_POST["image"];
            $userID= $_POST["userID"];
            


            $response = createPost($description,$image,$userID);
            echo json_encode($response);
        

        break;
   
    case 'DELETE':
        if(!empty($_GET["id"])){
            $id = intval($_GET["id"]);
            $response = deletePost($id);
            echo json_encode($response);
        }else{
            echo json_encode([
                "status"=>"something went wrong",
            ]);
        }
        break;

   
    
    default:
        echo json_encode([
            "status"=>"something went wrong",
        ]);
        break;
 }

 function getAllPosts(){
    global $mysqli;
    $query = $mysqli->prepare("
    SELECT posts.*, users.name,users.position,users.image
    FROM posts
     JOIN users ON users.id = posts.userID
    GROUP BY posts.id;");
    $query->execute();
    $query->store_result();
    $num_rows = $query->num_rows();

    if($num_rows==0){
        $response['status']='Failed';
        $response['message']= 'no airlines available';
    }else{
        $posts = [];
        $query->bind_result($id, $description, $image,$createdAt,$userID,$userName,$userPosition,$userImg);
        while($query->fetch()){
            $post = [
                'id' => $id,
                'description'=>$description,
                'image'=> $image,
                'createdAt'=> $createdAt,
                'userID'=> $userID,
                'userName'=> $userName,
                'userPosition'=> $userPosition,
                'userImage'=> $userImg
                
               
            ];

            $posts[] = $post;
        }

        $response['status']='success';
        $response['posts']= $posts;
        
    }
    return $response;
 }

 function getUserPosts($id){
    global $mysqli;
    $query = $mysqli->prepare('select * from posts where userID=?');
    $query->bind_param('i', $id);
    $query->execute();
    $query->store_result();
    $query->bind_result($id, $name, $rating,$logo);
    $query->fetch();
    $num_rows=$query->num_rows();
    if($num_rows==0){
        $response['status']='Failed';
        $response['message']= 'no airlines available';
    }else{
        $posts = [];
        $query->bind_result($id, $description, $image,$createdAt,$userID,$userName,$userPosition,$userImg);
        while($query->fetch()){
            $post = [
                'id' => $id,
                'description'=>$description,
                'image'=> $image,
                'createdAt'=> $createdAt,
                'userID'=> $userID,
                'userName'=> $userName,
                'userPosition'=> $userPosition,
                'userImage'=> $userImg
                
               
            ];

            $posts[] = $post;
        }
    }
    return $response;
 }

 function createPost($description,$image,$userID){
    global $mysqli;
    $query = $mysqli->prepare('insert into posts(description,image,userID) values(?,?,?)');
    $query->bind_param('ssi', $description,$image,$userID);
    if($query->execute()){
        $response['status']="success";
    }else{
        $response["status"]= "failed";
    }  
    return $response;
    
    
 }

 function deletePost($id){
    global $mysqli;
    $query = $mysqli->prepare("DELETE FROM posts WHERE id = ?");
    $query->bind_param("i", $id);
    $query->execute();
    $query->store_result();

    $response["status"] = "Success";

    return $response;
 }

 