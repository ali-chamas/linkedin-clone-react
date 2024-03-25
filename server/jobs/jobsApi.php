<?PHP
 
 include("../db/connection.php");

 $request_method = $_SERVER["REQUEST_METHOD"];

 switch ($request_method) {
    case "GET":
        if(!empty($_GET["userID"])){
            $id = intval($_GET["userID"]);
            $response = getUserJobs($id);
            echo json_encode($response);
        }else{
            $response = getAllJobs();
            echo json_encode($response);
        }
        break;
    case "POST":
        
            $description= $_POST["description"];
            $position= $_POST["position"];
            $userID= $_POST["userID"];
            $location=$_POST['location'];
            


            $response = createJob($position,$description,$location,$userID);
            echo json_encode($response);
            
        

        break;
   
    case 'DELETE':
        if(!empty($_GET["id"])){
            $id = intval($_GET["id"]);
            $response = deleteJob($id);
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

 function getAllJobs(){
    global $mysqli;
    $query = $mysqli->prepare("
    SELECT jobs.*, users.name,users.image
    FROM jobs
     JOIN users ON users.id = jobs.userID
    GROUP BY jobs.id;");
    $query->execute();
    $query->store_result();
    $num_rows = $query->num_rows();

    if($num_rows==0){
        $response['status']='Failed';
        $response['message']= 'no jobs available';
    }else{
        $jobs = [];
        $query->bind_result($id, $position, $description,$location,$postedAt,$userID,$userName,$userImg);
        while($query->fetch()){
            $job = [
                'id' => $id,
                'position'=>$position,
                'description'=>$description,
                'location'=> $location,
                'postedAt'=> $postedAt,
                'userID'=> $userID,
                'userName'=> $userName,
                'userImage'=> $userImg
                
               
            ];

            $jobs[] = $job;
        }}

        $response['status']='success';
        $response['jobs']= $jobs;
        
    
    return $response;
 }

 function getUserJobs($id){
    global $mysqli;
    $query = $mysqli->prepare('SELECT jobs.*, users.name,users.image
    FROM jobs
     JOIN users ON users.id = jobs.userID
     WHERE jobs.userID=?
    GROUP BY jobs.id');
    $query->bind_param('i', $id);
    $query->execute();
    $query->store_result();
    $num_rows=$query->num_rows();
    if($num_rows==0){
        $response['status']='Failed';
        $response['message']= 'no airlines available';
    }else{
        $jobs = [];
        $query->bind_result($id, $position, $description,$location,$postedAt,$userID,$userName,$userImg);
        while($query->fetch()){
            $job = [
                'id' => $id,
                'position'=>$position,
                'description'=>$description,
                'location'=> $location,
                'postedAt'=> $postedAt,
                'userID'=> $userID,
                'userName'=> $userName,
                'userImage'=> $userImg
                
               
            ];

            $jobs[] = $job;
        }
    }
        $response['status']='success';
        $response['jobs']= $jobs;
    
    return $response;
 }
 function createJob($position,$description,$location,$userID){
    global $mysqli;
    $query = $mysqli->prepare('insert into jobs(position,description,location,userID) values(?,?,?,?)');
    $query->bind_param('sssi', $position,$description,$location,$userID);
    if($query->execute()){
        $response['status']="success";
    }else{
        $response["status"]= "failed";
    }  
    return $response;
    
    
 }

 function deleteJob($id){
    global $mysqli;
    $query = $mysqli->prepare("DELETE FROM jobs WHERE id = ?");
    $query->bind_param("i", $id);
    $query->execute();
    $query->store_result();

    $response["status"] = "Success";

    return $response;
 }

 