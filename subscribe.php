<?php 

$email = $_POST['email']; // Don't edit!

// Returned messages - you can edit it
$saved = '<i class="icon-ok-sign"></i> Email '.$email.' has been saved'; 
$exist = '<i class="icon-ok-circle"></i> Email '.$email.' is already in our database'; 
$error = '<i class="icon-warning-sign"></i> Something was wrong - <a href="#" onclick="Javascript:showForm();">try again</a>';


/*
 * DONT'T EDIT
 */

require_once('./config.php');

if ($apiKey && $listId) { /* Save subscriber to your Mail Chimp list */
	echo saveToMailChimp($email, $apiKey, $listId);
} else { /* Save subscriber to CSV file */
	echo saveToFile($email);
}


/*
 * FUNCTIONS
 */

/* Function save email adress to Mail Chimp database */
function saveToMailChimp($email, $apiKey, $listId) {
	require_once ('MailChimp/MailChimp.class.php');
	global $saved, $exist, $error;
	$MailChimp = new MailChimp($apiKey);

	$result = $MailChimp->call('lists/subscribe', array (
		'id'			=> $listId,
		'email' 		=> array ('email'=>$email),
		'merge_vars'	=> array ('FNAME'=>'', 'LNAME'=>''),
		'double_optin'	=> false,
		'update_existing'   => false,
		'replace_interests'	=> false,
		'send_welcome'		=> false,
	));

	if ($result['euid']) {
		return $saved;
	} else if ($result['code'] == '214') {
		return $exist;
	} else {
		return $error;
	}
}

/* Function save email adress to CSV file subscribers-[randomkey].csv on your serwer */
function saveToFile($email) {
	global $saved, $exist, $error;
	$files = glob("../subscribers-*.csv");
	$filename = $files[0];

	if ($filename) {
		$file = fopen($filename, 'a+');
	} else {
		$filename = '../subscribers-'.uniqid().'.csv';
		$file = fopen($filename, 'a+');
	}

	if($email) {
		if (strpos(file_get_contents($filename), $email) === false) {
			fwrite($file, $email.';'.chr(10));
			fclose($file);
			return $saved;
		} else {
			return $exist;
		}
	} else {
		return $error;
	}
}
