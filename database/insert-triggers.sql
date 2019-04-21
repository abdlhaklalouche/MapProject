use MapProject;

delimiter //

CREATE TRIGGER VilleInsertCheckSuperficie BEFORE INSERT ON villes
FOR EACH ROW
BEGIN
	SET @TotalVillesSuperficie = (SELECT SUM(`superficie`) FROM villes);
	SET @TotalSuperficie = @TotalVillesSuperficie + NEW.superficie;
	
    IF(@TotalSuperficie > 2381741) THEN
		SIGNAL SQLSTATE '45000';
    END IF;
END; //


CREATE TRIGGER VilleUpdateCheckSuperficie BEFORE UPDATE ON villes
FOR EACH ROW
BEGIN
	SET @TotalVillesSuperficie = (SELECT SUM(`superficie`) FROM villes);
	SET @TotalSuperficie = @TotalVillesSuperficie + NEW.superficie;
	
    IF(@TotalSuperficie > 2381741) THEN
		SIGNAL SQLSTATE '45000';
    END IF;
END; //

CREATE TRIGGER VilleInsertCheckPopulation BEFORE INSERT ON villes
FOR EACH ROW
BEGIN
	SET @TotalVillesPopulation = (SELECT SUM(`population`) FROM villes);
	SET @TotalPopulation = @TotalVillesPopulation + NEW.population;
	
    IF(@TotalPopulation >  42548601) THEN
		SIGNAL SQLSTATE '45000';
    END IF;
END; //


CREATE TRIGGER VilleUpdateCheckPopulation BEFORE UPDATE ON villes
FOR EACH ROW
BEGIN
	SET @TotalVillesPopulation = (SELECT SUM(`population`) FROM villes);
	SET @TotalPopulation = @TotalVillesPopulation + NEW.population;
	
    IF(@TotalPopulation > 42548601) THEN
		SIGNAL SQLSTATE '45000';
    END IF;
END; //

delimiter ;