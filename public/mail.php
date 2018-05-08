<?
if($_POST){
        $to = 'alyona.andriyevskaya@gmail.com';
        $project_name = 'Test AJAX';
        $subject = 'Test AJAX';
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p><b>Name:</b> '.$_POST['name'].'</p>
                        <p><b>Name2:</b> '.$_POST['name2'].'</p>
                        <p><b>Name3:</b> '.$_POST['name3'].'</p>
                        <p><b>Email:</b> '.$_POST['email'].'</p>
                        <p><b>Phone:</b> '.$_POST['phone'].'</p>
                        <p><b>Message:</b> '.$_POST['message'].'</p>
                    </body>
                </html>';
        function adopt($text) {
            return '=?UTF-8?B?'.base64_encode($text).'?=';
        }

        $headers = "MIME-Version: 1.0" . PHP_EOL .
        "Content-Type: text/html; charset=utf-8" . PHP_EOL .
        'From: '.adopt($project_name).' <'.$to.'>' . PHP_EOL .
        'Reply-To: '.$to.'' . PHP_EOL;
        // $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        // $headers .= "From: Sender Airlog Monitor\r\n";
        mail($to, $subject, $message, $headers);
        echo json_encode(array('status' => 'success'));
} else {
  echo json_encode(array('status' => 'error'));
}
?>
