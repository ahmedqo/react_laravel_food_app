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
            Pour réinitialiser votre mot de passe KingFood, veuillez cliquer sur ce lien:
        </p>
    </div>
    <a href="/reset-password/{{ $data['token'] }}"
        style="
            border: unset;
            display: block;
            font-size: 1.125rem;
            border-radius: 0.5rem;
            font-weight: 500;
            color: #FFFFFF;
            background: #2EBF91;
            padding: 10px 0;
            width: 100%;
            text-align: center;
            cursor: pointer;
        ">
        Réinitialiser password
    </a>
</div>
