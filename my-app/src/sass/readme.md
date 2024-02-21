For real-time compiling bør alle laste ned:
Live Sass Complier extention.

--------------

Tenker å bruke "@use" for å importere undermappene til main.scss. Undermappene, f.eks. "abstracts" trenger da en _index.scss fil.
I denne index filen må man forwarde alle filene i den mappa, og det blir seende slik ut: 

    @forward 'variables';
    @forward 'media-queries';
    @forward 'colors';

Ved å bruke @use, så kan man lett importere style sheets inn i andre sheets. F.eks _colors.scss inn i /pages/_home.scss.
I _home.scss, importerer man da ved å skrive: @use "../abstracts" as *;

-----------------
mer info: 

https://dev.to/dostonnabotov/a-modern-sass-folder-structure-330f 