<?PHP
 
 include("../db/connection.php");

 
 $request_method = $_SERVER["REQUEST_METHOD"];

 if($request_method=="POST"){

  if(!empty($_GET["id"])){
    $id = intval($_GET["id"]);
    
    
    $name= $_POST["name"];
    
    $image= $_POST["image"];
    $position=$_POST['position'];
    $location=$_POST['location'];
    $bio=$_POST['bio'];
    
    
    $response = edituser($id,$name,$password,$image,$position,$location,$bio);
    echo json_encode($response);

}

 }
 function edituser($id,$name,$password,$image,$position,$location,$bio){
  global $mysqli; 

  $query = $mysqli->prepare("UPDATE users SET name=?,image=?,position=?,location=?,bio=? WHERE id=?");
  $query->bind_param("ssssssi",$name,$image,$position,$location,$bio, $id);
  if($query->execute()){
     $response['status']="success";
  }else{
      $response["status"]= "failed";
  }
  return $response;
}