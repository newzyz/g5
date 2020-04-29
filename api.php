<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './api/vendor/autoload.php';
$config=[
    'settings'=>[
        'displayErrorDetails'=>true,
    "db" => [
        "host" => "127.0.0.1",
        "dbname" => "hermes",
        "user" => "root",
        "pass" => "usbw"
        ],
    ],
];

$app = new \Slim\App ($config);

// DIC configuration
$container = $app->getContainer();

// PDO database library 
$container ['db'] = function ($c) {
    $settings = $c->get('settings')['db'];
    $pdo = new PDO("mysql:host=" . $settings['host'] . ";dbname=" . $settings['dbname'],
        $settings['user'], $settings['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};
$app->get('/getdb/{idcheck}', function (Request $request, Response $response, array $args) {
    $id = $args['idcheck'];
    $sql = "Select * from guest_info g join rooms r
            on g.ginfo_room = r.room_id 
            join room_type rt
            on r.room_type = rt.rtype_id
            join building b
            on r.room_building = b.building_id
            join room_view rv
            on r.room_view = rv.rview_id
            where ginfo_id='".$id."'";
    $sth = $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    
    return $this->response->withJson($sth);
});

$app->get('/getRoom', function (Request $request, Response $response, array $args) {
    $sql = "Select * from rooms r join room_status rs on r.room_status = rs.rstatus_id where rs.rstatus_eng='Avaliable'";
    $sth = $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    return $this->response->withJson($sth);
});

$app->get('/updateRoom/{rid}/{gid}', function (Request $request, Response $response, array $args) {
    $rid = $args['rid'];
    $gid = $args['gid'];
    $sql = "UPDATE guest_info SET ginfo_room = '$rid' WHERE ginfo_id = '$gid';";
    $this->db->query($sql);
    header( "location: http://localhost/php/g5/page/test.html" );
    exit(0);

});

$app->run();
?>

