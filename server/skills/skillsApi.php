<?PHP
 
 include("../db/connection.php");

 $request_method = $_SERVER["REQUEST_METHOD"];

 switch ($request_method) {
    case "GET":
        if(!empty($_GET["userID"])){
            $id = intval($_GET["userID"]);
            $response = getUserSkills($id);
            echo json_encode($response);
        }
        break;
    case "POST":
        
            $skill=$_POST['skill'];
            $userID=$_POST['userID'];
            


            $response = AddSkill($skill,$userID);
            echo json_encode($response);
            
        

        break;
   
    case 'DELETE':
        if(!empty($_GET["id"])){
            $id = intval($_GET["id"]);
            $response = deleteSkill($id);
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

 

 function getUserSkills($id){
    global $mysqli;
    $query = $mysqli->prepare('SELECT * from skills WHERE skills.userID = ?');
    $query->bind_param('i', $id);
    $query->execute();
    $query->store_result();
    $num_rows=$query->num_rows();
    if($num_rows==0){
        $response['status']='Failed';
        $response['message']= 'no skiils available';
    }else{
        $skills = [];
        $query->bind_result($id, $skill,$userID);
        while($query->fetch()){
            $skill = [
                'id' => $id,
                'skill'=>$skill,
                
                'userID'=> $userID,
                
                
               
            ];

            $skills[] = $skill;
        }
    }
        $response['status']='success';
        $response['skills']= $skills;
    
    return $response;
 }
 function addSkill($skill,$userID){
    global $mysqli;
    $query = $mysqli->prepare('insert into skills(skill,userID) values(?,?)');
    $query->bind_param('si', $skill,$userID);
    if($query->execute()){
        $response['status']="success";
    }else{
        $response["status"]= "failed";
    }  
    return $response;
    
    
 }

 function deleteSkill($id){
    global $mysqli;
    $query = $mysqli->prepare("DELETE FROM skills WHERE id = ?");
    $query->bind_param("i", $id);
    $query->execute();
    $query->store_result();

    $response["status"] = "Success";

    return $response;
 }

 