# TrustIn_blockchain_backend for Smart Insurance System

# Documentation

###All methods are divided in 5 parts
*** 1. Accessible by Company***
*** 2. Accessible by Hospital***
*** 3. Accessible by Citizens***
*** 4. Accessible by Owner***
*** 5. Accessible by Everyone***

### ++ METHODS ++
#### Accessible by Company

* function addInsuranceScheme(string calldata _schemeName, uint _premium, uint _benifit, string calldata _conditions) external onlyCompany

	add a new insurance scheme
	duplicate schemes cant be added

* function getSchemeAndClaim(uint8 mode) public view onlyCompany returns(SchemesTaken[] memory)

	replacement for older version code
	can be used to access requested and accepted schemes and claims
	mode =1 for requestedSchemes
	mode =2 for acceptedSchemes
	mode =3 for requestedClaims
	mode =4 for acceptedClaims

* function schemeVerificationResponse(uint index, uint8 response) public payable onlyCompany

	accept or reject a scheme verification request
	index is the index of struct from getSchemeRequests()
	1 for accept/ 2 for reject as response

* function claimVerificationResponse(uint index, uint8 response) public payable onlyCompany

	accept or reject a claim verification request
	index is the index of struct from getClaimRequests()
	1 for accept/ 2 for reject as response

* function myCompanyProfile() external view onlyCompany returns(InsuranceCompany memory)

	returns the InsuranceCompany struct containg company details

#### Accessible by Hospital

* function addRecord(address _citizen, string calldata _diseaseName, string calldata _urls) external onlyHospital

	Add citizens medical records

* function applyClaim(address _citizen, bytes32 _schemeId, uint _amount) external onlyHospital

	Apply for a claim 

* function myHospitalProfile() external view onlyHospital returns(Hospital memory)

	returns the Hospital struct containg hospital details

#### Accessible by Citizen

* function applyScheme(bytes32 _schemeId) external payable onlyCitizen

	apply for a scheme using its schemeID
	Scheme should not be already applied

	***  requires equal amount of payment of ether i.e. the scheme premium***

* function myCitizenProfile() external view onlyCitizen returns(Citizen memory)

	returns the Citizen struct containg citizen details

#### Accessible by Owner

* function checkInsuranceCompanyExists(address _address, string calldata _name, string calldata _location) public view onlyOwner returns(bytes32)

	Check if a insurance company already exists used by other methods internally

* function checkHospitalExists(address _address, string calldata _name, string calldata _location) public view onlyOwner returns(bytes32) 

	Check if a hospital already exists used by other methods internally

* function addInsuranceCompany(address _address, string calldata _name, string calldata _contact, string calldata _location) external onlyOwner

	register a new insurance company
	duplicates not allowed

* function addHospital(address _address, string calldata _name, string calldata _contact, string calldata _location) external onlyOwner

	register a new hospital
	duplicates not allowed

#### Accessible by Everyone

* function getlistct() public view returns(Citizen[] memory)

	developement function used for getting all the registered citizens

	***THIS WILL NOT BE INCLUDED IN PRODUCTION AND IS ONLY FOR DEBUGGING***

* function getCitizenDetails(address _citizen) public view returns(Citizen memory)

	get details of a citizen by its address
	returns struct of Citizen

* function getHospitalDetails(address _hospital) public view returns(Hospital memory)

	get details of a hospital by its address
	returns struct of Hospital

* function login() public view returns(int)

	login function for the system to detemine what is the role of the user
	returns -->
	1 for citizen
	2 for company
	3 for hospital
	4 for owner
	-1 for not a registered user

* function addCitizen(string calldata _name, string calldata _contact, string calldata _location) external

	add a citizen on the system

* function getInsuranceCompanies() public view returns(InsuranceCompany[] memory)

	Get all insurance companies
	retruns an array of structs of InsuranceCompany

* function getSchemes(address comp) public view returns(InsuranceScheme[] memory)

	get all schemes of a perticular company
	returns array of struct of InsuranceScheme

* function isAppliedScheme(address _citizenAddress, bytes32 _schemeId) private view returns(int)

	check if a user has applied a scheme, used internally

* function getAppliedSchemes(address _citizen) public view returns(SchemesTaken[] memory)

	Get all the schemes a citizen has applied for
	Returns an array of struct of SchemesTaken

function getRecords(address _citizen) public view returns(Record[] memory)
	Get all medical records of a perticular citizen
	retuns an array of struct of Record