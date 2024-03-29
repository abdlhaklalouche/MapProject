use MapProject;

delimiter //

DROP TRIGGER VilleInsertCheckSuperficie;
DROP TRIGGER VilleUpdateCheckSuperficie;
DROP TRIGGER VilleInsertCheckPopulation;
DROP TRIGGER VilleUpdateCheckPopulation;

CREATE TRIGGER VilleInsertCheckSuperficie BEFORE INSERT ON villes
BEGIN
	SET @TotalVillesSuperficie = (SELECT SUM(`superficie`) FROM villes);
	SET @TotalSuperficie = @TotalVillesSuperficie + NEW.superficie;
	
    IF(@TotalSuperficie > 2381741) THEN
		SIGNAL SQLSTATE '45000';
    END IF;
END; //


CREATE TRIGGER VilleUpdateCheckSuperficie BEFORE UPDATE ON villes
BEGIN
	SET @TotalVillesSuperficie = (SELECT SUM(`superficie`) FROM villes where `id`<>NEW.id);
	SET @TotalSuperficie = @TotalVillesSuperficie + NEW.superficie;
	
    IF(@TotalSuperficie > 2381741) THEN
		SIGNAL SQLSTATE '45000';
    END IF;
END; //

CREATE TRIGGER VilleInsertCheckPopulation BEFORE INSERT ON villes
BEGIN
	SET @TotalVillesPopulation = (SELECT SUM(`population`) FROM villes);
	SET @TotalPopulation = @TotalVillesPopulation + NEW.population;
	
    IF(@TotalPopulation >  42548601) THEN
		SIGNAL SQLSTATE '45000';
    END IF;
END; //


CREATE TRIGGER VilleUpdateCheckPopulation BEFORE UPDATE ON villes
BEGIN
	SET @TotalVillesPopulation = (SELECT SUM(`population`) FROM villes where `id`<>NEW.id);
	SET @TotalPopulation = @TotalVillesPopulation + NEW.population;
	
    IF(@TotalPopulation > 42548601) THEN
		SIGNAL SQLSTATE '45000';
    END IF;
END; //

delimiter ;