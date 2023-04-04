<div style="width: 800px;margin: auto">
    <header style="margin-bottom: 2rem">
        <img src="https://res.cloudinary.com/dz2ezolgc/image/upload/v1650612663/logo-column.png" alt="logo"
            style="
            display: block;
            width: 200px;
            height: auto;
            margin: auto;
        " />
    </header>
    <div style="display: flex;align-items: center;justify-content: space-between;gap: 1rem;">
        <h1
            style="font-family: 'Roboto', sans-serif;width: 100%;line-height: 1;word-break: break-word;font-weight: 800;font-size: 1.125rem;color: #1d1d1d;text-align: left;">
            #{{ $data['reserve'] }}
        </h1>
        <h1
            style="font-family: 'Roboto', sans-serif;width: 100%;line-height: 1;word-break: break-word;font-weight: 800;font-size: 1.5rem;color: #2ebf91;text-align: right;">
            {{ $data['total'] }} MAD
        </h1>
    </div>
    <table style="width: 100%;border-spacing: 0 10px;">
        <tr>
            <td
                style="font-family: 'Roboto', sans-serif;padding: 0 20px;font-size: 0.875rem;font-weight: 900;text-align: center;">
                Date Heure
            </td>
            <td
                style="font-family: 'Roboto', sans-serif;padding: 0 20px;font-size: 0.875rem;font-weight: 900;text-align: center;">
                Personnes
            </td>
            @if ($data['comment'])
                <td
                    style="font-family: 'Roboto', sans-serif;padding: 0 20px;font-size: 0.875rem;font-weight: 900;text-align: center;">
                    Commentaire
                </td>
            @endif
        </tr>
        <tr style="background: #faf9f9;">
            <td
                style="font-family: 'Roboto', sans-serif;padding: 14px 20px;vertical-align: middle;text-align: center;border-top-left-radius: 0.5rem;border-bottom-left-radius: 0.5rem;">
                {{ $data['date'] }} {{ $data['time'] }}
            </td>
            <td style="font-family: 'Roboto', sans-serif;padding: 14px 20px;vertical-align: middle;text-align: center">
                {{ $data['count'] }}
            </td>
            @if ($data['comment'])
                <td
                    style="font-family: 'Roboto', sans-serif;padding: 14px 20px;vertical-align: middle;text-align: center;border-bottom-right-radius: 0.75rem;border-top-right-radius: 0.75rem;">
                    {{ $data['comment'] }}
                </td>
            @endif
        </tr>
    </table>
    <table style="width: 100%;border-spacing: 0 10px;">
        <tr>
            <td
                style="font-family: 'Roboto', sans-serif;padding: 5px 20px;font-size: 0.875rem;font-weight: 900;text-align: center;">
                Image
            </td>
            <td
                style="font-family: 'Roboto', sans-serif;padding: 0 20px;font-size: 0.875rem;font-weight: 900;vertical-align: middle;">
                Titre
            </td>
            <td
                style="font-family: 'Roboto', sans-serif;padding: 0 20px;font-size: 0.875rem;font-weight: 900;text-align: center;vertical-align: middle;">
                Quantite
            </td>
            <td
                style="font-family: 'Roboto', sans-serif;padding: 0 20px;font-size: 0.875rem;font-weight: 900;text-align: center;vertical-align: middle;">
                Prix
            </td>
        </tr>
        @foreach ($data['items'] as $item)
            <tr style="background: #faf9f9">
                <td
                    style="padding: 10px 20px;vertical-align: middle;text-align: center;border-top-left-radius: 0.5rem;border-bottom-left-radius: 0.5rem;">
                    <img src="{{ $item['product']['image'] }}"
                        style="display: block;width: 60px;height: 60px;border-radius: 0.5rem;object-fit: cover;" />
                </td>
                <td style="font-family: 'Roboto', sans-serif;padding: 14px 20px;vertical-align: middle;">
                    <h1
                        style="font-family: 'Roboto', sans-serif;margin: 0;line-height: 1;word-break: break-word;font-weight: 800;font-size: 1rem;color: #1d1d1d;">
                        {{ $item['product']['name'] }}
                    </h1>
                </td>
                <td
                    style="font-family: 'Roboto', sans-serif;padding: 14px 20px;vertical-align: middle;text-align: center;">
                    <h1
                        style="font-family: 'Roboto', sans-serif;width: max-content;margin: auto;line-height: 1;word-break: break-word;font-weight: 800;font-size: 1rem;color: #1d1d1d;">
                        {{ $item['quantity'] }}
                    </h1>
                </td>
                <td
                    style="font-family: 'Roboto', sans-serif;padding: 14px 20px;vertical-align: middle;text-align: center;border-bottom-right-radius: 0.75rem;border-top-right-radius: 0.75rem;">
                    <h1
                        style="font-family: 'Roboto', sans-serif;width: max-content;margin: auto;line-height: 1;word-break: break-word;font-weight: 800;font-size: 1rem;color: #1d1d1d;">
                        {{ $item['quantity'] + $item['product']['price'] }} MAD
                    </h1>
                </td>
            </tr>
        @endforeach
    </table>
</div>
