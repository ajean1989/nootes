<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="/css/style.css" />
		<title>Nootes</title>
	</head>


	<body>

		
		<header>
            <h1>nootes</h1>
		</header>

        <div class="modal">
            <?php 
                echo $content;
            ?>
        </div>

        <div class="Public">

            <h2>Notes Publics</h2>

            <div class="Public__content">

                <div class="Public__content__left">
                    <h3></h3>
                    <h4></h4>
                    <ul></ul>
                </div>

                <div class="Public__content__middle">
                </div>

                <div class="Public__content__right">
                </div>

            </div>

        </div>

		<section>

            <div class="Private__content__left">
                <h3></h3>
                <h4></h4>
                <ul></ul>
            </div>

			<div class="Private__content__middle">
        	
			</div>

            <div class="Private__content__right">
                
            </div>

		</section>

		<footer>

		    <div class="footer">- Adrien Jacquenet - ad.jacquenet@gmail.com - Le site n'utilise pas de cookies -</div>

		</footer>

        <script type="module" src="./js/index.js"></script>


	</body>
</html>