# Implementacja w Postgresql

## Schemat bazy danych 

![Schemat bazy danych](images/schemat.png)

## Tabele

### Tabela discounts

Tabela zawiera wszystkie możliwe zniżki na bilety.

`discount_ID` - ID zniżki <br>
`discount_name` - nazwa zniżki <br>
`percent` - procent zniżki <br>

Implementacja:
```sql 
CREATE TABLE discounts (
    discount_ID bigserial  NOT NULL,
    discount_name varchar(30)  NOT NULL,
    percent int  NOT NULL,
    CONSTRAINT discounts_pk PRIMARY KEY (discount_ID)
);
```
### Tabela log_reservation

Tabela zawiera logi zmiany statusu rezerwacji. 

`log_id` - ID logowania rezerwacji <br>
`reservation_id` - ID rezerwacji <br>
`new_status` - nowy status <br>
`date` - data <br>

Implementacja:
```sql
CREATE TABLE log_reservation (
    log_id bigserial  NOT NULL,
    reservation_id bigserial  NOT NULL,
    new_status varchar(10)  NOT NULL,
    date timestamp  NOT NULL,
    CONSTRAINT log_reservation_pk PRIMARY KEY (log_id)
);
```
### Tabela reservations

Tabela zawiera rezerwacje biletów na pociągi. 

`reservation_ID` - ID rezerwacji <br>
`user_ID` - ID użytkownika <br>
`payment_status` - status płatności <br>
`price` - cena <br>
`res_date` - data rezerwacji <br>
`discount_ID` - ID zniżki <br>
`route_ID` - ID trasy <br>
`start_station_id` - ID stacji początkowej <br>
`end_station_id` - ID stacji końcowej <br>
`departure_date` - data wyjazdu <br>

Implementacja:
```sql 
CREATE TABLE reservations (
    reservation_ID bigserial  NOT NULL,
    user_ID bigserial  NOT NULL,
    payment_status varchar(10)  NOT NULL,
    price int  NOT NULL,
    res_date timestamp  NOT NULL,
    discount_ID bigserial  NOT NULL,
    route_ID bigserial  NOT NULL,
    start_station_id bigserial  NOT NULL,
    end_station_id bigserial  NOT NULL,
    departure_date date  NOT NULL,
    CONSTRAINT reservations_pk PRIMARY KEY (reservation_ID)
);
```
### Tabela route

Tabela zawiera ogólne trasy pociagów. 

`route_ID` - ID trasy <br>
`train_ID` - ID pociągu <br>
`day_of_week` - dzień tygodnia <br>
`start_station_ID` - ID stacji początkowej <br>
`end_station_ID` - ID stacji końcowej <br>
`active` - czy trasa jest aktywna <br>

Implementacja:
```sql 
CREATE TABLE route (
    route_ID bigserial  NOT NULL,
    train_ID bigserial  NOT NULL,
    day_of_week varchar(10)  NOT NULL,
    start_station_ID bigserial  NOT NULL,
    end_station_ID bigserial  NOT NULL,
    active boolean  NOT NULL,
    CONSTRAINT route_pk PRIMARY KEY (route_ID)
);
```
### Tabela route_sections

Tabela zawiera dokładne dane dla danej trasy pociągu. 

`route_section_ID` - ID odcinka trasy <br>
`section_id` - ID odcinka <br>
`route_ID` - ID trasy <br>
`departure` - czas odjazdu  <br>
`arrival` - czas przyjazdu <br>
`price` - cena <br>

Implementacja:
```sql 
CREATE TABLE route_sections (
    route_section_ID bigserial  NOT NULL,
    section_id bigserial  NOT NULL,
    route_ID bigserial  NOT NULL,
    departure time  NOT NULL,
    arrival time  NOT NULL,
    price float  NOT NULL,
    CONSTRAINT route_sections_pk PRIMARY KEY (route_section_ID)
);
```
### Tabela seat_reservations

Tabela zawiera rezerwacje miejsca dla konkretnego bileu. 

`seat_res_id` - ID rezerwacji miejsca <br>
`reservation_id` - ID rezerwacji <br>
`seat_id` - ID miejsca <br>
`section_id` - ID odcinka <br>

Implementacja:
```sql 
CREATE TABLE seat_reservations (
    seat_res_id bigserial  NOT NULL,
    reservation_id bigserial  NOT NULL,
    seat_id bigserial  NOT NULL,
    section_id bigserial  NOT NULL
);
```
### Tabela seats

Tabela zawiera dostępne miejsca w pociągach.

`seat_id` - ID miejsca <br>
`class` - klasa <br>

Implementacja:
```sql
CREATE TABLE seats (
    seat_id bigserial  NOT NULL,
    class int  NOT NULL,
    CONSTRAINT seats_pk PRIMARY KEY (seat_id)
);
```

### Tabela section_details

Tabela zawiera odcinki po których jeżdzą pociagi. 

`section_id` - ID sekcji <br>
`start_station_ID` - ID stacji początkowej <br>
`next_station_ID` - ID następnej stacji <br>
`distance` - odległość <br>

Implementacja:
```sql
CREATE TABLE section_details (
    section_id bigserial  NOT NULL,
    start_station_ID bigserial  NOT NULL,
    next_station_ID bigserial  NOT NULL,
    distance float  NOT NULL,
    CONSTRAINT section_details_pk PRIMARY KEY (section_id)
);
```
### Tabela stations

Tabela słownikowa przechowująca wszystkie obsługiwane stacje. 

`station_ID` - ID stacji <br>
`name` - nazwa <br>

Implementacja:
```sql 
CREATE TABLE stations (
    station_ID bigserial  NOT NULL,
    name varchar(50)  NOT NULL,
    CONSTRAINT stations_pk PRIMARY KEY (station_ID)
);
```

### Tabela trains

Tabela przechowuje wszystkie pociągi. 

`train_ID` - ID pociągu <br>
`type` - nazwa pociągu <br>
`capacity` - pojemność <br>

Implementacja:
```sql
CREATE TABLE trains (
    train_ID bigserial  NOT NULL,
    type varchar(30)  NOT NULL,
    capacity int  NOT NULL,
    CONSTRAINT trains_pk PRIMARY KEY (train_ID)
);
```
### Tabela users

Tabela przechowuje dane o użytkownikach. 

`user_ID` - ID użytkownika <br>
`firstname` - imię <br>
`lastname` - nazwisko <br>
`email` - email <br>
`phone` - telefon <br>
`login` - login <br>
`password` - hasło <br>

Implementacja:
```sql
CREATE TABLE users (
    user_ID bigserial  NOT NULL,
    firstname varchar(30)  NOT NULL,
    lastname varchar(30)  NOT NULL,
    email varchar(30)  NOT NULL,
    phone varchar(15)  NOT NULL,
    login varchar(30)  NOT NULL,
    password varchar(30)  NOT NULL,
    CONSTRAINT users_pk PRIMARY KEY (user_ID)
);
```

# Widoki

## Widok all_routes

Widok zawiera informacje o wszystkich trasach pociągu. 

Implementacja: 
```sql
create or replace view public.all_routes (route_id, type, day_of_week, start_station_name, end_station_name, active) as
SELECT route.route_id,
       trains.type,
       route.day_of_week,
       start_station.name AS start_station_name,
       end_station.name   AS end_station_name,
       route.active
FROM route
         JOIN trains ON route.train_id = trains.train_id
         JOIN stations start_station ON route.start_station_id = start_station.station_id
         JOIN stations end_station ON route.end_station_id = end_station.station_id;
```

Przykładowy widok:

<span style="color:red;">TODO jak bedzie wiecej tras xD</span>

## Widok all_stations

Widok zawiera wszystkie możliwe stacje po których poruszają sie pociągi. 

Implementacja: 
```sql
create or replace view public.all_stations(station_id, name) as
SELECT stations.station_id,
       stations.name
FROM stations;
```

Przykładowy widok: 

![all_stations](images/all_stations.png)

# Procdeury

## add_train

Funkcja przyjmuje nazwę pociagu oraz jego pojemność i dodaje ten pociąg do bazy. 

Implementacja: 
```sql
create or replace procedure public.add_train(IN _type character varying, IN _capacity integer)
    language plpgsql
as
$$
BEGIN
    INSERT INTO trains(type, capacity)
    VALUES (_type, _capacity);
END;
$$;
```

Przykładowe wywołanie:
```sql
CALL add_train('EU09', 40);
```

Wynik: 

![add_train](images/add_train.png)

## add_station

Funkcja przyjmuje nazwę stacji i dodaje ją do bazy.

Implementacja: 
```sql
create or replace procedure public.add_station(IN _name character varying)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(SELECT 1 FROM stations WHERE name = _name) THEN
        RAISE EXCEPTION 'Such station already exists in database!';
    ELSE
        INSERT INTO stations (name)
        VALUES (_name);
    end if;
END;
$$;
```

Przykładowe wywołanie:
```sql
CALL add_station('Łańcut');
```

Wynik: 

![add_station](images/add_station.png)


## add_route

Procedura dodaje nową trasę.
Procedura sprawdza 
- czy stacja początkowa i końcowa istnieją
- czy taka trasa już nie jest w bazie
- <span style="color: red">sprawdzanie czy pociag jest dostepny</span> 

Implementacja: 
```sql
create or replace procedure public.add_route(IN _train_id integer, IN _day_of_week character varying, IN _start_station_name character varying, IN _end_station_name character varying)
    language plpgsql
as
$$
DECLARE
    v_start_station_id INT;
    v_end_station_id INT;
BEGIN
    IF EXISTS(SELECT 1 FROM trains WHERE train_id = _train_id) THEN
        v_start_station_id := get_station_id(_start_station_name);
        IF v_start_station_id IS NULL THEN
            RAISE EXCEPTION 'Start station "%" does not exist!', _start_station_name;
        END IF;

        v_end_station_id := get_station_id(_end_station_name);
        IF v_end_station_id IS NULL THEN
            RAISE EXCEPTION 'End station "%" does not exist!', _end_station_name;
        END IF;

        IF EXISTS(SELECT 1 FROM route
                  WHERE train_id = _train_id
                    AND day_of_week = _day_of_week
                    AND start_station_id = v_start_station_id
                    AND end_station_id = v_end_station_id) THEN
            RAISE EXCEPTION 'Route already exists with these parameters.';
        ELSE
            INSERT INTO route(train_id, day_of_week, start_station_id, end_station_id, active)
            VALUES (_train_id, _day_of_week, v_start_station_id, v_end_station_id, TRUE);
        END IF;
    ELSE
        RAISE EXCEPTION 'There is no train with ID %', _train_id;
    END IF;
END;
$$;
```

Przykładowe wywołanie: 
```sql
CALL add_route(1, 'Monday', 'Ropczyce', 'Łańcut');
```

Wynik: 

![add_route](images/add_route.png)





# Funkcje

## get_station_id

Funkcja przyjmuje nazwę stacji i zwraca ID stacji, w przypadku braku stacji zwraca null. 

Implementacja:

```sql
create function get_station_id(_name character varying) returns integer
    language plpgsql
as
$$
DECLARE result INT;
BEGIN
    SELECT stations.station_id INTO result
    FROM stations
    WHERE _name = stations.name;

    RETURN result;
    EXCEPTION WHEN NO_DATA_FOUND THEN
    RETURN NULL;
end;
$$;
```

Przykładowe wywołanie:
```sql
SELECT get_station_id('Rzeszów Główny');
```

Wynik: 

![get_station_id](images/get_station_id.png)

# Triggery