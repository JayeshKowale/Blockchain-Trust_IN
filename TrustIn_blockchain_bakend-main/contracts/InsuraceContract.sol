// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.3;

contract InsuranceContract
{
    address owner;
    struct InsuranceCompany
    {
        address companyAddress;
        string name;
        string contact;
        string location;
        uint premiumPool;
        uint[] schemes;
        uint[] schemeRequests;
        uint[] schemeVerified;
        uint[] claimRequests;
        uint[] claimVerified;
    }
    struct SchemesTaken
    {
        address citizenAddress;
        address companyAddress;
        address hospitalAddress;
        uint appliedScheme;
        uint premiumPaid;
        uint benifitUsed;
        uint requestedAmount;
        uint8 schemeStauts;//1 denotes accepted, 2 denotes rejected
        uint8 claimStatus;//1 denotes accepted, 2 denotes rejected
    }
    struct Citizen
    {
        address citizenAddress;
        string name;
        string contact;
        string location;
        uint[] takenSchemes;
        uint[] records;
    }
    struct Hospital
    {
        address hospitalAddress;
        string name;
        string contact;
        string location;
    }
    struct Record
    {
        string diseaseName;
        string urlReport;
    }
    struct InsuranceScheme
    {
        bytes32 schemeId;
        address companyAddress;
        string schemeName;
        uint premium;
        uint benifit;
        string conditions;
    }

    mapping( bytes32 => bool) private companyNameCheck;
    mapping( address => bool) private companyAddressCheck;
    mapping( bytes32 => bool) private schemeCheck;
    mapping( address => bool) private citizenAddressCheck;
    mapping( bytes32 => bool) private hospitalNameCheck;
    mapping( address => bool) private hospitalAddressCheck;
    
    mapping( address => uint) private companyIndexes;
    mapping( bytes32 => uint) private schemeIndexes;
    mapping( address => uint) private citizenIndexes;
    mapping( address => uint) private hospitalIndexes;

    InsuranceCompany[] public listInsuranceCompanies;
    InsuranceScheme[] public listInsuranceSchemes;
    Citizen[] public listCitizens;
    SchemesTaken[] public listSchemesTaken;
    Hospital[] public listHospitals;
    Record[] public listRecords;

    constructor()
    {
        owner = msg.sender;
    }

    modifier onlyOwner
    {
        require(msg.sender == owner, "You are NOT a registered owner");
        _;
    }

    modifier onlyCompany
    {
        require(companyAddressCheck[msg.sender] == true, "You are NOT a registered company");
        _;
    }

    modifier onlyHospital
    {
        require(hospitalAddressCheck[msg.sender] == true, "You are NOT a registered hospital");
        _;
    }

    modifier onlyCitizen
    {
        require(citizenAddressCheck[msg.sender] == true, "You are NOT a registered citizen");
        _;
    }

    //START///////////////////////GENERAL///////////////////////////

    function getCitizenDetails(address _citizen) public view returns(Citizen memory)
    {
        require(citizenAddressCheck[_citizen] == true, "Invalid ciztizen");
        return listCitizens[citizenIndexes[_citizen]];
    }

    function getHospitalDetails(address _hospital) public view returns(Hospital memory)
    {
        require(hospitalAddressCheck[_hospital] == true, "Invalid hospital");
        return listHospitals[hospitalIndexes[_hospital]];
    }

    function login() public view returns(int)
    {
        if(citizenAddressCheck[msg.sender])
            return 1;
        else if(companyAddressCheck[msg.sender])
            return 2;
        else if(hospitalAddressCheck[msg.sender])
            return 3;
        else if(msg.sender == owner)
            return 4;
        return -1;
    }
    
    function addCitizen(string calldata _name, string calldata _contact, string calldata _location) external
    {
        require(citizenAddressCheck[msg.sender] == false, "You are already registered!");
        
        Citizen memory ct;
        ct.citizenAddress = msg.sender;
        ct.name = _name;
        ct.contact = _contact;
        ct.location = _location;

        listCitizens.push(ct);
        citizenAddressCheck[msg.sender] = true;
        citizenIndexes[msg.sender] = listCitizens.length -1;
    }

    function getInsuranceCompanies() public view returns(InsuranceCompany[] memory)//address[] memory, string[] memory, string[] memory, string[] memory)
    {   /*
        uint size = listInsuranceCompanies.length;
        address[] memory addresses = new address[](size);
        string[] memory names = new string[](size);
        string[] memory contacts = new string[](size);
        string[] memory locations = new string[](size);
        
        for(uint i = 0; i<size; i++)
        {
            InsuranceCompany memory ic = listInsuranceCompanies[i];
            addresses[i] = ic.companyAddress;
            names[i] = ic.name;
            contacts[i] = ic.contact;
            locations[i] = ic.location;
        }

        return (addresses, names, contacts, locations);
        */
        return listInsuranceCompanies;
    }

    function getSchemes(address comp) public view returns(InsuranceScheme[] memory)
    {
        require(companyAddressCheck[comp] == true, "Invalid company!");

        uint cindex = companyIndexes[comp];
        uint[] memory sindex = listInsuranceCompanies[cindex].schemes;

        InsuranceScheme[] memory allSchemes = new InsuranceScheme[](sindex.length);
        for(uint i = 0; i<sindex.length; i++)
            allSchemes[i] = listInsuranceSchemes[sindex[i]];

        return allSchemes;
    }

    function isAppliedScheme(address _citizenAddress, bytes32 _schemeId) private view returns(int)
    {
        uint cindex = citizenIndexes[_citizenAddress];
        uint[] memory ts= listCitizens[cindex].takenSchemes;
        uint ascheme;
        for(uint i =0;i<ts.length;i++)
        {
            SchemesTaken memory st = listSchemesTaken[ts[i]];
            ascheme = st.appliedScheme;
            if(listInsuranceSchemes[ascheme].schemeId == _schemeId && st.schemeStauts != 2)
                return int(ts[i]);
        }
        return -1;
    }

    function getAppliedSchemes(address _citizen) public view returns(SchemesTaken[] memory)
    {
        Citizen memory ct = listCitizens[citizenIndexes[_citizen]];
        uint[] memory ts = ct.takenSchemes;
        SchemesTaken[] memory st = new SchemesTaken[](ts.length);
        for(uint i=0; i< ts.length; i++)
            st[i] = listSchemesTaken[ts[i]];

        return st;
    }

    function getRecords(address _citizen) public view returns(Record[] memory)
    {
        Citizen memory ct = listCitizens[citizenIndexes[_citizen]];
        uint[] memory r = ct.records;
        Record[] memory rec = new Record[](r.length);
        for(uint i=0; i< r.length; i++)
            rec[i] = listRecords[r[i]];

        return rec;
    }
    //START///////////////////////OWNER/////////////////////////////

    function checkInsuranceCompanyExists(address _address, string calldata _name, string calldata _location) public view onlyOwner returns(bytes32)
    {
        bytes32 uid = keccak256(abi.encode(_name, _location));
        require(companyNameCheck[uid] == false, "Name already taken");
        require(companyAddressCheck[_address] == false , "Address already taken");
        return uid;
    }

    function checkHospitalExists(address _address, string calldata _name, string calldata _location) public view onlyOwner returns(bytes32) 
    {
        bytes32 uid = keccak256(abi.encode(_name, _location));
        require(hospitalNameCheck[uid] == false, "Name already taken for hospital");
        require(hospitalAddressCheck[_address] == false, "Hospital already registered");
        return uid;
    }

    function addInsuranceCompany(address _address, string calldata _name, string calldata _contact, string calldata _location) external onlyOwner
    {
        InsuranceCompany memory comp;
        comp.companyAddress = _address;
        comp.name = _name;
        comp.contact = _contact;
        comp.location = _location;

        bytes32 uid = checkInsuranceCompanyExists(_address, _name, _location);

        companyNameCheck[uid] = true;
        companyAddressCheck[_address] = true;

        listInsuranceCompanies.push(comp);
        companyIndexes[_address] = listInsuranceCompanies.length -1;
    }

    function addHospital(address _address, string calldata _name, string calldata _contact, string calldata _location) external onlyOwner
    {
        Hospital memory hosp;
        hosp.hospitalAddress = _address;
        hosp.name = _name;
        hosp.contact = _contact;
        hosp.location = _location;

        bytes32 uid = checkHospitalExists(_address, _name, _location);

        hospitalNameCheck[uid] = true;
        hospitalAddressCheck[_address] = true;

        listHospitals.push(hosp);
        hospitalIndexes[_address] = listHospitals.length -1;
    }

    //START//////////////////INSURANCE--COMPANY/////////////////////

    function addInsuranceScheme(string calldata _schemeName, uint _premium, uint _benifit, string calldata _conditions) external onlyCompany
    {
        uint index = companyIndexes[msg.sender];
        bytes32 sId = keccak256(abi.encode(msg.sender,_schemeName,_premium,_conditions));
        require(schemeCheck[sId] == false, "Scheme already Exists!");

        InsuranceScheme memory scheme;
        scheme.schemeName = _schemeName;
        scheme.premium = _premium;
        scheme.benifit = _benifit;
        scheme.conditions = _conditions;
        scheme.companyAddress = msg.sender;
        scheme.schemeId = sId;

        listInsuranceSchemes.push(scheme);
        schemeCheck[sId] = true;
        uint schemeIndex = listInsuranceSchemes.length -1;
        schemeIndexes[sId] = schemeIndex;
        
        InsuranceCompany storage comp = listInsuranceCompanies[index];
        comp.schemes.push(schemeIndex);
    }

    function getSchemeAndClaim(uint8 mode) public view onlyCompany returns(SchemesTaken[] memory)
    {
        uint cindex = companyIndexes[msg.sender];
        InsuranceCompany storage ct = listInsuranceCompanies[cindex];
        uint[] memory reqindex;
        if(mode == 1)
            reqindex = ct.schemeRequests;
        else if(mode == 2)
            reqindex = ct.claimRequests;
        else if(mode == 3)
            reqindex = ct.schemeVerified;
        else
            reqindex = ct.claimVerified;
        SchemesTaken[] memory res = new SchemesTaken[](reqindex.length);
        for(uint i = 0; i<reqindex.length; i++)
            res[i] = listSchemesTaken[reqindex[i]];

        return res;
    }

    function schemeVerificationResponse(uint index, uint8 response) public payable onlyCompany
    {
        require(response == 1 || response == 2, "Invalid response!");
        uint cindex = companyIndexes[msg.sender];
        InsuranceCompany storage comp = listInsuranceCompanies[cindex];

        uint[] storage reqindex = comp.schemeRequests;
        require(index < reqindex.length);

        uint stindex = reqindex[index];
        SchemesTaken storage st = listSchemesTaken[stindex];

        st.schemeStauts = response;

        delete reqindex[index];
        reqindex[index] = reqindex[reqindex.length -1];
        reqindex.pop();

        if(response == 2)
        {
            payable(st.citizenAddress).transfer(st.premiumPaid);
        }
        else
        {
            comp.premiumPool += st.premiumPaid;
            listInsuranceCompanies[cindex].schemeVerified.push(stindex);
        }
    }

    function claimVerificationResponse(uint index, uint8 response) public payable onlyCompany
    {
        require(response == 1 || response == 2, "Invalid response!");
        uint cindex = companyIndexes[msg.sender];
        InsuranceCompany storage comp = listInsuranceCompanies[cindex];

        uint[] storage claimReq = comp.claimRequests;
        require(index < claimReq.length);

        uint stindex = claimReq[index];
        SchemesTaken storage st = listSchemesTaken[stindex];
        require(st.requestedAmount < comp.premiumPool, "Insufficient funds!");
        
        st.claimStatus = response;

        delete claimReq[index];
        claimReq[index] = claimReq[claimReq.length -1];
        claimReq.pop();

        if(response == 2)
        {
            st.requestedAmount = 0;
        }
        else
        {
            payable(st.hospitalAddress).transfer(st.requestedAmount);
            comp.premiumPool -= st.requestedAmount;
            st.benifitUsed += st.requestedAmount;
            comp.claimVerified.push(stindex);
        }
    }

    function myCompanyProfile() external view onlyCompany returns(InsuranceCompany memory)
    {
        return listInsuranceCompanies[companyIndexes[msg.sender]];
    }
    //START///////////////////////HOSPITAL//////////////////////////

    function addRecord(address _citizen, string calldata _diseaseName, string calldata _urls) external onlyHospital
    {
        require(citizenAddressCheck[_citizen] == true, "Invalid Citizen");
        Citizen storage ct = listCitizens[citizenIndexes[_citizen]];

        Record memory rec;
        rec.diseaseName = _diseaseName;
        rec.urlReport = _urls;

        listRecords.push(rec);
        ct.records.push(listRecords.length -1);
    }

    function applyClaim(address _citizen, bytes32 _schemeId, uint _amount) external onlyHospital
    {
        require(citizenAddressCheck[_citizen] == true, "Invalid Citizen");
        require(schemeCheck[_schemeId] == true, "Invalid Scheme ID");
        int temp = isAppliedScheme(_citizen, _schemeId);
        require(temp >= 0, "Scheme Not applied by citizen");
        uint schemeTakenIndex = uint(temp);

        SchemesTaken storage st = listSchemesTaken[schemeTakenIndex];
        InsuranceScheme memory scheme = listInsuranceSchemes[st.appliedScheme];
        require(_amount + st.benifitUsed <= scheme.benifit, "Amount exceeds beneficiary amount");

        st.hospitalAddress = msg.sender;
        st.requestedAmount = _amount;

        uint compindex = companyIndexes[st.companyAddress];
        listInsuranceCompanies[compindex].claimRequests.push(schemeTakenIndex);
    }

    function myHospitalProfile() external view onlyHospital returns(Hospital memory)
    {
        return listHospitals[hospitalIndexes[msg.sender]];
    }

    //START///////////////////////CITIZEN///////////////////////////
    
    function applyScheme(bytes32 _schemeId) external payable onlyCitizen
    {
        require(schemeCheck[_schemeId] == true, "Invalid Scheme ID");
        int temp = isAppliedScheme(msg.sender, _schemeId);
        require(temp < 0, "You have aleady applied for this Scheme");

        uint cindex = citizenIndexes[msg.sender];
        uint scheme = schemeIndexes[_schemeId];
        uint reqPremium = listInsuranceSchemes[scheme].premium;
        require(reqPremium == msg.value, "Invalid premium amount");
        
        address compAddress = listInsuranceSchemes[scheme].companyAddress;
        SchemesTaken memory st;
        st.companyAddress = compAddress;
        st.citizenAddress = msg.sender;
        st.appliedScheme = scheme;
        st.premiumPaid = msg.value;

        listSchemesTaken.push(st);
        uint compindex = companyIndexes[compAddress];
        listCitizens[cindex].takenSchemes.push(listSchemesTaken.length -1);
        listInsuranceCompanies[compindex].schemeRequests.push(listSchemesTaken.length -1);
    }

    function myCitizenProfile() external view onlyCitizen returns(Citizen memory)
    {
        return listCitizens[citizenIndexes[msg.sender]];
    }
}