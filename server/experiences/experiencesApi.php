<?PHP
 
 include("../db/connection.php");

 $request_method = $_SERVER["REQUEST_METHOD"];

 switch ($request_method) {
    case "GET":
        if(!empty($_GET["userID"])){
            $id = intval($_GET["userID"]);
            $response = getUserExperiences($id);
            echo json_encode($response);
        }
        break;
    case "POST":
        
            $position=$_POST['position'];
            $company=$_POST['company'];
            $start_year=$_POST['start_year'];
            $end_year=$_POST['end_year'];
            $description=$_POST['description'];
            $userID=$_POST['userID'];
            


            $response = addExperience($position,$company,$start_year,$end_year,$description,$userID);
            echo json_encode($response);
            
        

        break;
   
    case 'DELETE':
        if(!empty($_GET["id"])){
            $id = intval($_GET["id"]);
            $response = deleteExperience($id);
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

 

 function getUserExperiences($id){
    global $mysqli;
    $query = $mysqli->prepare('SELECT * from experiences WHERE userID = ?');
    $query->bind_param('i', $id);
    $query->execute();
    $query->store_result();
    $num_rows=$query->num_rows();
    if($num_rows==0){
        $response['status']='Failed';
        $response['message']= 'no skiils available';
    }else{
        $experiences = [];
        $query->bind_result($id, $position,$company,$start_year,$end_year,$description,$userID);
        while($query->fetch()){
            $experience = [
                'id' => $id,
                'position'=>$position,
                'company'=> $company,
                'start_year'=> $start_year,
                'end_year'=> $end_year,
                'description'=> $description,
                'userID'=> $userID,
                
                
               
            ];

            $experiences[] = $experience;
        }
    }
        $response['status']='success';
        $response['experiences']= $experiences;
    
    return $response;
 }
 function addExperience($position,$company,$start_year,$end_year,$description,$userID){
    global $mysqli;
    $query = $mysqli->prepare('insert into experiences(position,company,start_year,end_year,description,userID) values(?,?,?,?,?,?)');
    $query->bind_param('ssiisi', $position,$company,$start_year,$end_year,$description,$userID);
    if($query->execute()){
        $response['status']="success";
    }else{
        $response["status"]= "failed";
    }  
    return $response;
    
    
 }

 function deleteExperience($id){
    global $mysqli;
    $query = $mysqli->prepare("DELETE FROM experiences WHERE id = ?");
    $query->bind_param("i", $id);
    $query->execute();
    $query->store_result();

    $response["status"] = "Success";

    return $response;
 }

 