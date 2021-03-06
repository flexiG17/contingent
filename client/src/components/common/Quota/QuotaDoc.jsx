import React, {useState, useEffect} from "react";
import "./QuotaDoc.css";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './QuotaEducation.css'
import './QuotaInfo.css'
import {addStudent} from "../../../services/serverData";
import iziToast from "izitoast";

function QuotaDoc() {
    const [active, setActive] = useState(true);
    const handleClickContract = () => {
        setActive(!active)
    }

    const [direction_number, setDirectionNumber] = useState('')
    const [location_educational_institution, setLocationEducationalInstitution] = useState('')
    const [graduation_year, setGraduationYear] = useState('')
    const [desired_education_level, setDesiredEducationLevel] = useState('')
    const [specialty_code, setSpecialtyCode] = useState('')
    const [specialty_direction, setSpecialtyDirection] = useState('')
    const [education_field, setEducationField] = useState('')
    const [educational_organization, setEducationalOrganization] = useState('')
    const [scholarship, setScholarship] = useState('')
    const [latin_name, setLatinName] = useState('')
    const [russian_name, setRussianName] = useState('')
    const [RF_location, setLocation] = useState('')
    const [contact_phone_number, setPhoneNumber] = useState('')
    //const [student_email, setStudentEmail] = useState('')
    const [country, setCountry] = useState('')
    const [birth_place, setBirthPlace] = useState('')
    const [birth_date, setBirthDate] = useState('')
    const [residence_place, setResidencePlace] = useState('')
    const [citizenship, setCitizenship] = useState('')
    const [gender, setGender] = useState('')
    const [passport_number, setPassportNumber] = useState('')
    const [passport_issued, setPassportIssued] = useState('')
    const [passport_issue_date, setPassportIssueDate] = useState('')
    const [passport_expiration, setPassportExpiration] = useState('')
    const [level_education, setLevelEducation] = useState('')
    const [name_educational_institution, setEducationalInstitution] = useState('')
    const [form_study, setFormStudy] = useState('')
    const [enrollment, setEnrollment] = useState('')
    const [enrollment_order, setEnrollmentOrder] = useState('')
    const [tutor_name, setTutorName] = useState('')
    const [entry_date, setEntryDate] = useState('')
    const [visa_validity, setVisaValidity] = useState('')
    const [document_path, setDocumentPath] = useState('')
    const [comments, setComments] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            location_educational_institution: location_educational_institution,
            graduation_year: graduation_year,
            desired_education_level: desired_education_level,
            specialty_code: specialty_code,
            specialty_direction: specialty_direction,
            education_field: education_field,
            educational_organization: educational_organization,
            scholarship: scholarship,
            latin_name: latin_name,
            russian_name: russian_name,
            direction_number: direction_number,
            RF_location: RF_location,
            contact_phone_number: contact_phone_number,
            /*studentEmail: student_email,*/
            country: country,
            birth_place: birth_place,
            birth_date: birth_date,
            residence_place: residence_place,
            citizenship: citizenship,
            gender: gender,
            passport_number: passport_number,
            passport_issued: passport_issued,
            passport_issue_date: passport_issue_date,
            passport_expiration: passport_expiration,
            level_education: level_education,
            name_educational_institution: name_educational_institution,
            education_type: "??????????",
            form_study: form_study,
            enrollment: enrollment,
            enrollment_order: enrollment_order,
            tutor_name: tutor_name,
            entry_date: entry_date,
            visa_validity: visa_validity,
            document_path: document_path,
            comments: comments
        }
        addStudent(data)
            .then((res) => {
                switch (res.status) {
                    case 201: {
                        iziToast.success({
                            title: res.statusText,
                            message: '?????????????? ?????????????? ???????????????? ?? ????????',
                            position: "topRight"
                        });
                        break
                    }
                    default: {
                        iziToast.error({
                            title: res.statusText,
                            message: '?????????????? ?? ?????????? ?????????????? ???????????????? ?????? ????????????????????',
                            position: "topRight",
                            color: "#FFF2ED"
                        });
                    }
                }
            })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="info_and_education_contaner">
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="tytle_contract_info"> ???????????? ????????????</p>
                        <input type="text" placeholder="??.??.??. (??????.)" className="input_style_contract"
                               onChange={event => setLatinName(event.target.value)} value={latin_name}/>
                        <input type="text" placeholder="??.??.??. (??????.)" className="input_style_contract"
                               onChange={event => setRussianName(event.target.value)} value={russian_name}/>
                        <input type="text" placeholder="???????????????????? ?? ????" className="input_style_contract"
                               onChange={event => setLocation(event.target.value)} value={RF_location}/>
                        <p className="tytle_contract_info"> ???????????????????? ????????????</p>
                        <input type="tel" placeholder="???????????????????? ??????????????" className="input_style_contract"
                               onChange={event => setPhoneNumber(event.target.value)} value={contact_phone_number}/>
                        {/*<input type="email" placeholder="E-mail" className="input_style_contract"
                               onChange={event => setStudentEmail(event.target.value)} value={student_email}/>*/}
                        <p className="tytle_contract_info"> ??????????</p>
                        <input type="text" placeholder="?????????????????????????????? ???????????????? ??????????????????"
                               className="input_style_contract"
                               onChange={event => setLocationEducationalInstitution(event.target.value)}
                               value={location_educational_institution}/>
                        <input type="text" placeholder="?????? ??????????????????" className="input_style_contract"
                               onChange={event => setGraduationYear(event.target.value)} value={graduation_year}/>
                        <input type="text" placeholder="?????????????? ?????????????????? ??????????????????????" className="input_style_contract"
                               onChange={event => setDesiredEducationLevel(event.target.value)}
                               value={desired_education_level}/>
                        <input type="text" placeholder="?????? ?????????????????????? ???????????????????? (??????????????????????????)"
                               className="input_style_contract"
                               onChange={event => setSpecialtyCode(event.target.value)} value={specialty_code}/>
                        <input type="text" placeholder="?????????????????????? ???????????????????? (??????????????????????????)"
                               className="input_style_contract"
                               onChange={event => setSpecialtyDirection(event.target.value)}
                               value={specialty_direction}/>
                        <input type="text" placeholder="?????????????? ??????????????????????" className="input_style_contract"
                               onChange={event => setEducationField(event.target.value)} value={education_field}/>
                        <input type="text" placeholder="?????????????????????????????? ??????????????????????" className="input_style_contract"
                               onChange={event => setEducationalOrganization(event.target.value)}
                               value={educational_organization}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="tytle_contract_info"> ???????????????????? ???????????? </p>
                        <input type="text" placeholder="????????????" className="input_style_contract"
                               onChange={event => setCountry(event.target.value)} value={country}/>
                        <input type="text" placeholder="?????????? ????????????????" className="input_style_contract"
                               onChange={event => setBirthPlace(event.target.value)} value={birth_place}/>
                        <input type="date" placeholder="???????? ????????????????" className="input_style_contract"
                               onChange={event => setBirthDate(event.target.value)} value={birth_date}/>
                        <input type="text" placeholder="?????????? ????????????????????" className="input_style_contract"
                               onChange={event => setResidencePlace(event.target.value)} value={residence_place}/>
                        <input type="text" placeholder="??????????????????????" className="input_style_contract"
                               onChange={event => setCitizenship(event.target.value)} value={citizenship}/>
                        <input type="text" placeholder="??????" className="input_style_contract"
                               onChange={event => setGender(event.target.value)} value={gender}/>
                        <input type="text" placeholder="?????????? ????????????????" className="input_style_contract"
                               onChange={event => setPassportNumber(event.target.value)} value={passport_number}/>
                        <input type="date" placeholder="???????? ???????????????? ???????????????? (????????)" className="input_style_contract"
                               onChange={event => setPassportExpiration(event.target.value)}
                               value={passport_expiration}/>
                        <input type="text" placeholder="?????? ??????????" className="input_style_contract"
                               onChange={event => setPassportIssued(event.target.value)} value={passport_issued}/>
                        <input type="date" placeholder="???????? ????????????" className="input_style_contract"
                               onChange={event => setPassportIssueDate(event.target.value)}
                               value={passport_issue_date}/>
                    </div>
                </div>
            </div>

            <div className="info_and_education_contaner">
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="tytle_contract_education"> ?????????????? ??????????????????????</p>
                        <input type="text" placeholder="?????????????? ?????????????????????? ??????????????????????"
                               className="input_style_contract"
                               onChange={event => setLevelEducation(event.target.value)} value={level_education}/>
                        <input type="text" placeholder="???????????????????????? ???????????????? ??????????????????"
                               className="input_style_contract"
                               onChange={event => setEducationalInstitution(event.target.value)}
                               value={name_educational_institution}/>
                        <p className="tytle_contract_education"> ???????????????? ?????????????????????? </p>
                        <input type="text" placeholder="??????. ?????????? ??????????????????????" className="input_style_contract"
                               onChange={event => setDirectionNumber(event.target.value)} value={direction_number}/>
                        <input type="text" placeholder="?????????? ????????????????" className="input_style_contract"
                               onChange={event => setFormStudy(event.target.value)} value={form_study}/>
                        <p className="tytle_contract_education"> ?????????????????????????? </p>
                        <input type="text" placeholder="??????????????????" className="input_style_contract"
                               onChange={event => setScholarship(event.target.value)} value={scholarship}/>
                        <input type="text" placeholder="????????????????????" className="input_style_contract"
                               onChange={event => setComments(event.target.value)} value={comments}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="tytle_contract_education"> ???????????? </p>
                        <input type="text" placeholder="???????????? ????????????????????" className="input_style_contract"
                               onChange={event => setEnrollment(event.target.value)} value={enrollment}/>
                        <input type="text" placeholder="?????????? ?????????????? ?? ????????????????????" className="input_style_contract"
                               onChange={event => setEnrollmentOrder(event.target.value)} value={enrollment_order}/>
                        <input type="text" placeholder="??????????????" className="input_style_contract"
                               onChange={event => setTutorName(event.target.value)} value={tutor_name}/>
                    </div>
                </div>
            </div>
            <div className="info_and_education_contaner">
                <div className="columns_position">
                    <div className="column_style_contract">
                        <p className="tytle_contract_doc"> ?????????????? ??????????????????????</p>
                        <input type="date" placeholder="???????? ????????????" className="input_style_contract"
                               onChange={event => setEntryDate(event.target.value)} value={entry_date}/>
                        <input type="date" placeholder="???????? ???????????????? ???????? (????????)" className="input_style_contract"
                               onChange={event => setVisaValidity(event.target.value)} value={visa_validity}/>
                    </div>
                    <div className="column_style_contract">
                        <p className="tytle_contract_doc_contaner"> ?????????????????? ?????? ???????????????? ?? ???????????? ????????????????
                            ???????????????????????? </p>
                        <p className="Doc_list">1) ???????? ???????????????? ???? ???????????? ???????????????? (.PDF)</p>
                        <p className="Doc_list">2) ?????????????? ???????????????? ???? ?????????????? ???????? (.PDF)</p>
                        <p className="Doc_list">3) ?????????????? ???????????? (.PDF)</p>
                        <p className="Doc_list">4) ????????????????, ???????????????????????????? ???????? ???????????? (.PDF)</p>
                        <p className="Doc_list">5) ?????????????????????????? ????????????????(.PDF)</p>
                        <p className="Doc_list">6) ?????????????? ?????????????????????????? ????????????????(.PDF)</p>
                        <input type="file" id="actual-btn" onChange={event => setDocumentPath(event.target.value)}
                               value={document_path} hidden/>
                        <label for="actual-btn" className="label_doc"> ???????????????? ?????????? <InsertDriveFileIcon
                            sx={{fontSize: 20}}/></label>
                    </div>
                </div>
            </div>
            <label className="checkbox_style_contract">
                <input type="checkbox" onClick={handleClickContract}/> ???? ??????????????, ?????? ???????????? ???????????????? ?????????????????
            </label>
            <div className="button_position_contract_doc">
                <button type="submit" className="button_style_contract_doc" disabled={active}>????????????????</button>
            </div>
        </form>
    )
}

export default QuotaDoc;