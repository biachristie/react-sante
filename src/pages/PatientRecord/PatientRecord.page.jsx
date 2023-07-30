import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Avatar, Button, Card } from "antd"
import { 
    MailOutlined, 
    MobileOutlined, 
    PhoneOutlined, 
    PrinterOutlined,
    SendOutlined,
    ShareAltOutlined,
    UserOutlined 
} from '@ant-design/icons'

import { TitlesContext } from '../../context/titles/titles.context'
import { PatientService } from "../../services/Patient/Patient.service"

function PatientRecordPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))

    let params = new URL(document.location).searchParams
    let patientId = params.get('id')

    const [patient, setPatient] = useState([])

    const { setTitle } = useContext(TitlesContext)
    useEffect(() => {
        setTitle('Detalhes do Paciente')

        if (patientId !== null) { 
            PatientService.Show(patientId).then(result => setPatient(result))
        }
    }, [])

    const render = () => {
        return (
                <>
                    <Card
                        className='patient-record-card'
                        title={
                            <Avatar
                                className='patient-record-avatar'
                                size={{
                                    xs: 80,
                                    sm: 100,
                                    md: 150,
                                    lg: 150,
                                    xl: 150,
                                    xxl: 150,
                                }}
                                shape='square'
                                icon={ <UserOutlined />}
                                src={ patient.avatar }
                            />
                        }
                        bordered={ false }
                        headStyle={{     
                            display: 'flex',
                            justifyContent: 'start',
                            paddingTop: '30px',
                            paddingLeft: '30px'
                        }}
                        bodyStyle={{
                            paddingLeft: '5px',
                            paddingRight: '30px',
                            width: '100%'
                        }}
                    >
                        <div className='patient-record-info-container'>
                            <div className='patient-record-data'>
                                <div className='patient-record-info'>
                                    <h2>{ patient.fullname }</h2>
                                    <ul className='patient-info'>
                                        <li>Idade: { patient.age } anos</li>
                                        <li>Convênio: { patient.healthPlanName || null }</li>
                                        <li>Contato de emergência: { patient.emergencyPhone }</li>
                                    </ul>
                                    <ul className='patient-address'>
                                        <li>{ patient.address || null}, { patient.addressNumber || null}{ '- ' + patient.complement || null}</li>
                                        <li>{ patient.district || null}, { patient.city || null} - { patient.state || null}</li>
                                        <li>{ patient.postalCode || null}</li>
                                        <li>{ patient.references || null}</li>
                                    </ul>
                                </div>
                                <div className='patient-record-contact'>
                                    <ul>
                                        <li>
                                            <PhoneOutlined style={{ marginRight: 10 }} />
                                            { patient.telephone || 'Não informado' }
                                        </li>
                                        <li>
                                            <MobileOutlined style={{ marginRight: 10 }} />
                                            { patient.cellphone || 'Não informado' }
                                        </li>
                                        <li>
                                            <MailOutlined style={{ marginRight: 10 }} />
                                            { patient.email || 'Não informado' }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='patient-record-buttons'>
                                <Button>
                                    <ShareAltOutlined style={{ marginRight: 5 }} /> Compartilhar
                                </Button>
                                <Button>
                                    <SendOutlined style={{ marginRight: 5 }} /> Enviar
                                </Button>
                                <Button>
                                    <PrinterOutlined style={{ marginRight: 5 }} /> Imprimir
                                </Button>
                            </div>
                        </div>
                    </Card>
                </>
            )
        }

    return isLogged ? render() : <Navigate to='/' />
}

export default PatientRecordPage