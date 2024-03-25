<?PHP
 
 include("../db/connection.php");

 
 $request_method = $_SERVER["REQUEST_METHOD"];

 if($request_method=="POST"){

  if(!empty($_GET["id"])){
    $id = intval($_GET["id"]);
    
    
    $cover=$_POST['cover'];
    
    
    $response = edituser($id,$cover);
    echo json_encode($response);

}

 }
 function edituser($id,$cover){
  global $mysqli; 
  
  $query = $mysqli->prepare("UPDATE users SET cover=? WHERE id=?");
  $query->bind_param("si",$cover, $id);
  if($query->execute()){
     $response['status']="success";
  }else{
      $response["status"]= "failed";
  }
  return $response;
}