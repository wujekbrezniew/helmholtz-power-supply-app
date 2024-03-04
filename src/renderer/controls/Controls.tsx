import React, { useState, useEffect } from 'react';
import IconBox from '../reusable/IconBox/IconBox.tsx';
import NumberInput from '../reusable/NumberInput/NumberInput.tsx';
import IconButton from '../reusable/IconButton/IconButton.tsx';
import VoltageIcon from '../../../assets/svg/alpha-v-circle.svg';
import AmperageIcon from '../../../assets/svg/alpha-a-circle.svg';
import ArrowRightIcon from '../../../assets/svg/arrow-right-thick.svg';
import PlayIcon from '../../../assets/svg/play.svg';
import Store from '../store/Store.tsx';
import './Controls.css'

function Controls() {

  const [midStatus, setMidStatus] = useState(false);
  const [smallStatus, setSmallStatus] = useState(false);
  const [largeStatus, setLargeStatus] = useState(false);
  const [midVisible, setMidVisible] = useState(false);
  const [smallVisible, setSmallVisible] = useState(false);
  const [largeVisible, setLargeVisible] = useState(false);

  useEffect(() => {
    window.addEventListener(Store['midEnabled'].event, ()=>{
      setMidStatus(Store['midEnabled'].value);
    })
    window.addEventListener(Store['midVisible'].event, ()=>{
      setMidVisible(Store['midVisible'].value);
    })
    window.addEventListener(Store['largeEnabled'].event, ()=>{
      setLargeStatus(Store['largeEnabled'].value);
    })
    window.addEventListener(Store['largeVisible'].event, ()=>{
      setLargeVisible(Store['largeVisible'].value);
    })
    window.addEventListener(Store['smallEnabled'].event, ()=>{
      setSmallStatus(Store['smallEnabled'].value);
    })
    window.addEventListener(Store['smallVisible'].event, ()=>{
      setSmallVisible(Store['smallVisible'].value);
    })
  });

  return (
    <div className="Controls">
      <div className="ControlsContainer">
        <div className="ControlsVoltage">
          <IconBox
            icon={VoltageIcon}
            width={80}
            height={80}
          ></IconBox>
          <NumberInput
            width={160}
            height={80}
            max={20}
            param={Store['midVoltageValueSend']}
          ></NumberInput>
          <NumberInput
            width={160}
            height={80}
            max={20}
            param={Store['largeVoltageValueSend']}
          ></NumberInput>
          <NumberInput
            width={160}
            height={80}
            max={20}
            param={Store['smallVoltageValueSend']}
          ></NumberInput>
        </div>
        <div className="ControlsAmperage">
          <IconBox
            icon={AmperageIcon}
            width={80}
            height={80}
          ></IconBox>
          <NumberInput
            width={160}
            height={80}
            max={10}
            step={0.0001}
            param={Store['midAmperageValueSend']}
          ></NumberInput>
          <NumberInput
            width={160}
            height={80}
            step={0.0001}
            max={10}
            param={Store['largeAmperageValueSend']}
          ></NumberInput>
          <NumberInput
            width={160}
            height={80}
            step={0.0001}
            max={10}
            param={Store['smallAmperageValueSend']}
          ></NumberInput>
        </div>
        <div className="ControlsButtons">
          <div className="ControlsButtonsFiller">
          </div>
          <div className="ControlsButtonsMid">
            <IconButton
              width={80}
              height={80}
              icon={ArrowRightIcon}
              color="#535e8c"
              onMouseColor="#a1a1f1"
              enabled={midVisible}
              onclick={async ()=>{
                const res = await window.electronAPI.powerSupplyControlSend(["mid", "set", Store['midVoltageValueSend'].value, Store['midAmperageValueSend'].value]);
              }}
            >
            </IconButton>
            <IconButton
              width={80}
              height={80}
              icon={PlayIcon}
              color="#535e8c"
              onMouseColor="#a1a1f1"
              enableColor="#a1a1f1"
              enableSignal={midStatus}
              enabled={midVisible}
              onclick={async ()=>{
                if (midStatus === false) {
                  const res = await window.electronAPI.powerSupplyControlSend(["mid", "enable"]);
                  await setMidStatus(res);
                } else if (midStatus === true) {
                  const res = await window.electronAPI.powerSupplyControlSend(["mid", "disable"]);
                  await setMidStatus(res);
                }
              }}
            >
            </IconButton>
          </div>
          <div className="ControlsButtonsLarge">
            <IconButton
              width={80}
              height={80}
              icon={ArrowRightIcon}
              color="#008280"
              onMouseColor="#9cd3d0"
              enabled={largeVisible}
              onclick={async ()=>{
                const res = await window.electronAPI.powerSupplyControlSend(["large", "set", Store['largeVoltageValueSend'].value, Store['largeAmperageValueSend'].value]);
              }}
            >
            </IconButton>
            <IconButton
              width={80}
              height={80}
              icon={PlayIcon}
              color="#008280"
              onMouseColor="#9cd3d0"
              enableColor="#9cd3d0"
              enableSignal={largeStatus}
              enabled={largeVisible}
              onclick={async ()=>{
                if (largeStatus === false) {
                  const res = await window.electronAPI.powerSupplyControlSend(["large", "enable"]);
                  await setLargeStatus(res);
                } else if (largeStatus === true) {
                  const res = await window.electronAPI.powerSupplyControlSend(["large", "disable"]);
                  await setLargeStatus(res);
                }
              }}
            >
            </IconButton>
          </div>
          <div className="ControlsButtonsSmall">
            <IconButton
              width={80}
              height={80}
              icon={ArrowRightIcon}
              color="#c22600"
              onMouseColor="#e58e7a"
              enabled={smallVisible}
              onclick={async ()=>{
                const res = await window.electronAPI.powerSupplyControlSend(["small", "set", Store['smallVoltageValueSend'].value, Store['smallAmperageValueSend'].value]);
              }}
            >
            </IconButton>
            <IconButton
              width={80}
              height={80}
              icon={PlayIcon}
              color="#c22600"
              onMouseColor="#e58e7a"
              enableColor="#e58e7a"
              enableSignal={smallStatus}
              enabled={smallVisible}
              onclick={async ()=>{
                if (smallStatus === false) {
                  const res = await window.electronAPI.powerSupplyControlSend(["small", "enable"]);
                  await setSmallStatus(res);
                } else if (smallStatus === true) {
                  const res = await window.electronAPI.powerSupplyControlSend(["small", "disable"]);
                  await setSmallStatus(res);
                }
              }}
            >
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Controls;
