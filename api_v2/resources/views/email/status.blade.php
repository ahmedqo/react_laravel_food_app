<div>
    <img src="https://res.cloudinary.com/dz2ezolgc/image/upload/v1650612663/logo-column.png" alt="logo"
        style="
            display: block;
            width: 200px;
            height: auto;
            margin: auto;
        " />
    <div style="margin: 20px 0; text-align: center">
        <h4>Bonjour {{ $data['name'] }}</h4>
        <p>
            Votre {{ $data['type'] == 0 ? 'commande' : 'reservation' }} <strong>#{{ $data['id'] }}</strong> est
            {{ $data['status'] }}
        </p>
    </div>
</div>
