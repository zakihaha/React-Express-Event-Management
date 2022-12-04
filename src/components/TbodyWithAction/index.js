import moment from 'moment/moment';
import React from 'react';
import { Image, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { config } from '../../configs';
import SButton from '../Button';

function TbodyWithAction({ data, display, editUrl, deleteAction, customAction, actionNotDisplay, status }) {
    const navigate = useNavigate()
    return (
        <tbody>
            {
                status === 'process' ? (
                    <tr>
                        <td colSpan={display.length + 1} style={{ textAlign: 'center' }}>
                            <div className="flex items-center justify-center">
                                <Spinner animation='border' variant='primary' />
                            </div>
                        </td>
                    </tr>
                ) : data.length ? (
                    data.map((data, index) => {
                        return (
                            <tr key={index}>
                                {
                                    Object.keys(data).map((key) =>
                                        display.indexOf(key) > -1 && (
                                            <td key={key}>
                                                {
                                                    key === 'avatar' ? (
                                                        <Image
                                                            height={40}
                                                            width={40}
                                                            roundCircle
                                                            src={`${config.api_image}/${data[key]}`}
                                                        />
                                                    ) : key === 'date' ? (
                                                        moment(data[key].format('DD-MM-YYYY, h:mm:ss a'))
                                                    ) : (
                                                        data[key]
                                                    )
                                                }
                                            </td>
                                        )
                                    )
                                }
                                {
                                    !actionNotDisplay && (
                                        <td>
                                            {
                                                editUrl && (
                                                    <SButton
                                                        variant='success'
                                                        size={'sm'}
                                                        action={() => navigate(`${editUrl}/${data._id}`)}
                                                    >
                                                        Edit
                                                    </SButton>
                                                )
                                            }
                                            {
                                                deleteAction && (
                                                    <SButton
                                                        variant='danger'
                                                        size={'sm'}
                                                        action={() => deleteAction(data._id)}
                                                    >
                                                        Hapus
                                                    </SButton>
                                                )
                                            }
                                        </td>
                                    )
                                }
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={display.length + 1} style={{ textAlign: 'center' }}>
                            Tidak Ditemukan Data
                        </td>
                    </tr>
                )
            }
        </tbody>
    );
}

export default TbodyWithAction;